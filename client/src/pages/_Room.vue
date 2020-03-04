<template>
  <div v-if="!loading" class="room">
    <div class="room__content">
      <div v-if="hosting">
        <RoomHostView />
      </div>
      <div v-else-if="created">
        <RoomPlayerView />
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
  </div>
</template>

<script>
import io from 'socket.io-client'
import axios from 'axios'
import crypto from 'crypto'

import RoomHostView from '@/components/RoomHostView';
import RoomPlayerView from '@/components/RoomPlayerView';

// TODO: Transfer to Vuex

export default {
  name: 'RoomPage',
  components: { RoomHostView, RoomPlayerView },
  data() {
    return {
      // url: '192.168.2.188:8081',
    
      // socket: null,
      // connected: [
        /*
        { username: 'Shrek' },
        { username: 'Shrek' },
        { username: 'Shrek' },
        { username: 'Shrek' },
        { username: 'Shrek' },
        { username: 'Shrek' },
        { username: 'Shrek' },
        { username: 'Shrek' },
        { username: 'Shrek' },
        { username: 'Shrek' },
        { username: 'Shrek' },
        { username: 'Shrek' },
        { username: 'Shrek' },
        { username: 'Shrek' },
        */
      // ],

    }
  },
  computed: {
    
  },
  methods: {
    connect() {
      try {
        this.socket = io.connect(`http://${this.url}`, { reconnect: true });
        const { socket } = this;

        socket.on('connect', () => {
          console.log(`Connected! (${this.socket.id})`)
        });  
      
        socket.on('room-client/updateList', (players) => {
          this.connected = players;
        });
     } catch (err) {
        console.error(err);
      }
    },

    async createRoom() {
      const { roomId, maxPlayers } = this;

      try {
        await axios.post(`http://${this.url}/room/create`, {
          id: roomId, maxPlayers
        });

        this.created = true;
        this.hosting = true;
      } catch(err) {
        console.error(err);
      }

      this.socket.emit('room/join', { roomId, username: 'HOST' });
    },

    async joinRoom() {
      const { roomId, username } = this;

      console.log(username);

      if (username.length > 0) {
        this.socket.emit('room/join', { roomId, username });
        this.joined = true;
      }
    },

    async generateId() {
      try {
        return await axios.get(`http://${this.url}/room/generateId`).then((r) => r.data.id);
      } catch (err) {
        console.error(err);
      }
       
      return null;
    }
  },
  async mounted() {
    const { roomId } = this.$route.params;

    this.connect();

    if (roomId) {
      try {
        const room = await axios.get(`http://${this.url}/room/get/${roomId}`).then((r) => r.data.room);
 
        this.roomId = roomId;        
        this.created = true;
        this.loading = false;

        return;
      } catch (err) {
        console.error(err);
      }
    } 

    this.roomId = await this.generateId();
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
body {
  background-color: #111;
}

.room {
  min-width: 360px;
  padding: 15px;
  width: 50%;
  margin: 0 auto;
  color: #d1d1d1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &__id {
    width: 100%;
    font-size: 68px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #fff;
  }

  &__link {
    width: 100%;
    font-size: 28px;
    margin-bottom: 5px;
  }

  &__url {
    font-size: 34px;
    font-weight: bold;
    color: #fff;
  }

  &__users {
    display: flex;
    margin-bottom: 5px;
    width: 30%;
    max-width: 760px;
    min-width: 360px;
    width: 100%;
    flex-wrap: wrap;
    margin: 5px auto;
  }

  &__users *:not(:nth-child(3n + 1)) {
    margin-left: 5px;
  }

  &__user {
    margin-bottom: 5px;
    padding: 5px 15px;
    background-color: #222;
    font-size: 24px;
    display: flex;
    padding: 10px;

    width: calc(100 / 3 * 1% - 5px * (3 - 2));
    text-align: center;
  }

  &__user p {
    flex: 1 0 auto;
  }

  &__button {
    border: 1px solid transparent;
    outline: none;
    padding: 15px 5px;
    font-size: 20px;
    color: #fff;
    background-color: #222;
    display: block;
    width: 100%;
    border-radius: 2px;

    cursor: pointer;

    &:hover {
      border: 1px solid #555;
      background-color: #333;
    }

    &--primary {
      background-color: #4aa570;

      &:hover {
        border: 1px solid lighten(#4aa570, 35%);
        background-color: lighten(#4aa570, 5%);
      }
    }
  }
}

ul li {
  margin: 15px 0;
}
</style>