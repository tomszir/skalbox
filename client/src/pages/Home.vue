<template>
  <div class="home">
    <div class="home__content-wrapper">
      <div class="home__content">
        <div class="text--title">
          Skalbox
        </div>

        <Input
          @input="onRoomIdChange"
          v-model="roomId"
          placeholder="Enter PIN"
          :max-length="4"
        />

        <Input
          v-if="roomIsFound"
          v-model="username"
          placeholder="Enter your username"
          :max-length="100"
        />
        
        <Button @click="joinRoom" :type="username.length > 0 ? 'success' : ''" :disabled="!roomIsFound">
          Join
        </Button>

        <div class="home__content-footer ">
           <p class="text">
            Click

            <a href="/room" class="link">
              here
            </a>

            to create a new room 
          </p>
        </div>
      </div>
    </div>
    <div class="home__footer">
      <p class="text">
        Made by 
        <a href="#" class="link">Toms Zvirbulis</a>, 
        <a href="#" class="link">Juris Ozoliņš</a>, 
        <a href="#" class="link">Jānis Straume</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import Input from '@/components/forms/Input';
import Button from '@/components/forms/Button';
import Message from '@/components/Message';

// TODO list:
//  -- Hide the footer when a mobile keyboard is out.

export default {
  name: 'HomePage',
  components: { Input, Button, Message },
  computed: {
    ...mapState([
      'socket',
      'baseURL'
    ])
  },
  data() {
    return {
      roomId: '',
      username: '',
      roomIsFound: false
    }
  },
  methods: {
    async joinRoom() {
      const { roomId, username } = this;
      
      if (username.length > 0) {
        socket.emit('room/join', { roomId, username });
        
        const room = await axios.get(`${baseURL}/room/get/${roomId}`)
          .then((r) => r.data.room)
          .catch(console.error);

        this.$store.commit('setRoom', room);
        this.$store.commit('setPlayer', {
          username,
          id: socket.id
        });
        this.$router.push({ path: `/room/${roomId}` });
      }
    },

    async onRoomIdChange(v) {
      if (v.length === 0) {
        this.roomIsFound = false;
        return;
      }

      if (v.length < 4) {
        this.roomIsFound = false;
        return;
      }

      try {
        await axios.get(`${baseURL}/room/get/${v}`);
        
        this.roomIsFound = true;
      } catch(err) {
        this.roomIsFound = false;
      }
    }
  },
  mounted() {
    this.$store.dispatch('connectToSocket');
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
}

.home__content-wrapper {
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home__content {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;

  margin: 0 15px;

  min-width: 240px;
  max-width: 460px;

  & > * {
    display: block;
    width: 100%;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }
}

.home__content-footer {
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 5px 0;
}

.home__footer {
  // position: absolute;
  // bottom: 0;

  flex-shrink: 0;
  display: flex;
  justify-content: center;

  border-top: 1px solid #222;

  padding: 25px;
}
</style>