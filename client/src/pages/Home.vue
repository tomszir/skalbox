<template>
  <div class="home">
    <div class="home__content-wrapper">
      <div class="home__content">
        <div class="text--title">
          Skalbox
        </div>
        
        <Input
          v-model="roomId"
          placeholder="Enter PIN"
          :max-length="4"
        />

        <Message v-if="error" type="danger">
          {{ error.message }}
        </Message>
        
        <Button @click="joinRoom">
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
        <a href="#" class="link">Jānis Skalbe</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Input from '@/components/Input';
import Button from '@/components/Button';
import Message from '@/components/Message';

// TODO list:
//  -- Hide the footer when a mobile keyboard is out.

export default {
  name: 'HomePage',
  components: { Input, Button, Message },
  data() {
    return {
      roomId: '',
      error: false
    }
  },
  methods: {
    async joinRoom() {

    },

    async onRoomIdChange(v) {
      if (v.length === 0) {
        this.error = null
      
        return;
      }

      if (v.length < 4) {
        this.error = {
          message: 'The room PIN must be atleast 4 characters long.'
        }

        return;
      }

      try {
        await axios.get(`http://localhost:8081/rooms/get/${v}`);
        
        this.error = null;
      } catch(err) {
        this.error = {
          message: 'Could not find the specified room.'
        };
      }
    }
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