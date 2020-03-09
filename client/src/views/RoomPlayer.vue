<template>
  <div class="player-view">
    <div class="player-view__header">
      <div class="text--title">
        {{ room.id }}
      </div>
      <div class="text--subtitle">
        {{ totalOnlinePlayers }} / {{ maxPlayers }} players
      </div>
    </div>

    <div v-if="joined" class="player-view__content">
      Connected as {{ player.username }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Input from '@/components/forms/Input';
import Button from '@/components/forms/Button';

export default {
  name: 'RoomPlayerView',
  components: { Input, Button },
  data() {
    return {
      maxPlayers: 8,
      joined: true
    }
  },
  computed: {
    ...mapState([
      'socket',
      'room',
      'player'
    ]),

    totalOnlinePlayers() {
      const { room } = this;
      return room.players.length;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>