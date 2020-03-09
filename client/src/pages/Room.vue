<template>
  <div v-if="!loading" class="room">
    <div class="room-view__wrapper" v-if="hosting">
      <RoomHost />
    </div>
    <div class="room-view__wrapper" v-else-if="created">
      <RoomPlayer />
    </div>
    <div v-else>
      <div class="text--title">
        404
      </div>
      <div class="text--subtitle">
        Room Not Found
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import RoomHost from '@/views/RoomHost';
import RoomPlayer from '@/views/RoomPlayer';

export default {
  name: 'RoomPage',
  components: {
    RoomHost, RoomPlayer
  },

  data() {
    return {
      hosting: false,
      created: false
    }
  },
  
  computed: {
    ...mapState([
      'baseURL', 
      'loading', 
      'room', 
      'player',
      'socket'
    ])
  },

  methods: {
    async createNewRoom() {
      const { baseURL } = this;

      const roomId = await axios.get(`${baseURL}/room/generateId`)
        .then((r) => r.data.id)
        .catch(console.error);

      await axios.post(`${baseURL}/room/create`, {
        roomId,
        maxPlayers: 0
      }).catch((err) => {
        this.error = true;
        console.error(err);
      });

      if (this.error) return;

      this.$store.commit('setRoom', {
        id: roomId,
        players: [],
        maxPlayers: 0
      });

      this.created = true;
      this.hosting = true;

      this.socket.emit('room/joinAsHost', roomId);
    }
  },
  async mounted() {
    this.$store.dispatch('connectToSocket');
    this.$store.commit('setLoading', true);

    const { baseURL } = this;
    const { roomId } = this.$route.params;

    if (!roomId) {
      await this.createNewRoom();
    } else {
      const room = await axios.get(`${baseURL}/room/get/${roomId}`)
        .then((r) => r.data.room)
        .catch(console.error);

      if (this.$store.state.player) {
        this.created = true;
        this.$store.commit('setRoom', room);
      }
    }

    this.$store.commit('setLoading', false);
  }
}
</script>

<style lang="scss" scoped>
.room {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
}

.room-view__wrapper {
  @extend .room;

  align-items: flex-start;
}
</style>