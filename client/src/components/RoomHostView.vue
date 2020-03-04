<template>
  <div class="host-view">
    <!-- Header -->
    <div class="host-view__header" v-if="currentRound == 1">
      <div class="text--subtitle">
        Go to <span class="text--title">{{ url }}</span> and enter <span class="text--title">{{ $store.state.room.id }}</span>
      </div>
    </div>

    <!-- Header when no one can join anymore -->
    <div class="host-view__header" v-else>
      <div class="text--title">
        Round {{ currentRound }} / {{ totalRounds }}
      </div>
      <div class="text--subtitle">
        {{ countdown }}
      </div>
    </div>

    <!-- Content -->
    <div class="host-view__content">
      <!-- List of all connected players. -->

      <div class="text--title">
        {{ $store.state.room.players.length }} <span class="text--subtitle">connected players</span>
      </div>

      <PlayerList ref="playerList" />
    </div>

    <!-- Footer -->
    <div class="host-view__footer">
      <!-- Button to start the round. -->
      <Button :type="everyoneReady ? 'success' : ''">
        {{ everyoneReady ? 'Start' : 'Force Start' }}
      </Button>
    </div>
  </div>
</template>

<script>
import Button from './Button';
import PlayerList from './PlayerList';

export default {
  name: 'RoomLobbyView',
  components: { Button, PlayerList },
  data () {
    return {
      url: 'skalbox.tozv.xyz',
      roomId: '3782',
      currentRound: 1,
      totalRounds: 3,
      everyoneReady: true
    }
  },
  mounted() {
    console.log(this.$store.state)
  }
}
</script>

<style lang="scss" scoped>
.host-view {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  width: 70%;
  height: 100%;
  min-width: 420px;
}

.host-view__header {
  width: 100%;
  flex-shrink: 1;
  padding: 20px 0;
  border-bottom: 1px solid #222;
  margin-bottom: 10px;
  text-align: center;
}

.host-view__content {
  margin: 0 auto;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;

  & > .player-list {
    flex: 1 0 auto;
  }

  & > .text--title {
    text-align: center;
    flex: 0 1 auto;
    border-bottom: 1px solid #222;
    padding-bottom: 15px;
  }
}

.host-view__footer {
  width: 100%;
  flex-shrink: 1;
  padding: 20px 0;
  border-top: 1px solid #222;
}
</style>