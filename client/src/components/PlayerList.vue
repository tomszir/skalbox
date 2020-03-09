<template>
  <div class="player-list">
    <div class="player-list__content">
      <!-- List all online players. -->
      <PlayerListItem v-for="player in room.players" :player="player" :key="player.username" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PlayerListItem from './PlayerListItem';

export default {
  name: 'PlayerList',
  components: { PlayerListItem },
  computed: {
    ...mapState([
      'room',
      'socket'
    ]),

    totalOnlinePlayers() {
      const { room } = this;
      return room.players.count;
    },
  }
}
</script>

<style lang="scss" scoped>
$rows: 3;
$columns: 5;

.player-list {
  overflow-y: auto;

  display: flex;
  flex: 1 0 auto;
  justify-content: center;

  &::-webkit-scrollbar {
    width: 5px;
    padding-left: 5px;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #333;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
}

.player-list__content {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  
  height: 0px;

  margin: 0 auto;
}

.text--subtitle {
  text-decoration: none;

  &:hover {
    color: #fff;
    text-decoration: line-through;
  }
}
</style>