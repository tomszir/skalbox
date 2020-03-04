<template>
  <div class="player-view">
    <div class="player-view__header">
      <div class="text--title">
        {{ roomId }}
      </div>
      <div class="text--subtitle">
        0 / 8 players
      </div>
    </div>
    <div class="player-view__content">
      <div v-if="joined">
        Joined as {{ username }}
      </div>
      <div v-else>
        <Input v-model="username" type="text" placeholder="Enter your name..." />
        
        <Button type="primary">
          Join
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Input from './Input';
import Button from './Button';

export default {
  name: 'RoomPlayerView',
  components: { Input, Button },
  data() {
    return {
      roomId: null,
      username: null,
      joined: null
      }
  }
}
</script>

<style lang="scss" scoped>
</style>