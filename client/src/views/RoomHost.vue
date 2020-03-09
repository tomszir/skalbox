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

      <div class="host-view__players">
        <div class="text--title">
          {{ totalOnlinePlayers }} <span class="text--subtitle">connected players</span>
        </div>
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
import { mapState } from 'vuex';

import Button from '@/components/forms/Button';
import PlayerList from '@/components/PlayerList';

export default {
  name: 'RoomLobbyView',
  components: { Button, PlayerList },
  computed: {
    ...mapState([
      'room',
      'socket'
    ]),

    totalOnlinePlayers() {
      const { room } = this;
      return room.players.length;
    }
  },
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
  margin-bottom: 10px;
  
  border-bottom: 1px solid #222;
  
  text-align: center;
}

.host-view__content {
  display: flex;
  flex: 1 0 auto;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;

  width: 100%;

  margin: 0 auto;
}

.host-view__players {
  text-align: center;
  flex: 0 1 auto;
  border-bottom: 1px solid #222;
  padding-bottom: 15px;
}

.host-view__footer {
  width: 100%;
  flex-shrink: 1;
  padding: 20px 0;
  border-top: 1px solid #222;
}
</style>