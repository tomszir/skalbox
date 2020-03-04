<template>
  <div class="player-list">
    <div class="player-list__content">
      <div v-for="player in players" class="player-list__player" :key="player.username">
        <a href="#" class="player-list__player-content text--subtitle">
          {{ player.username }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerList',/*
  data() {
    return {
      players: [
        { username: 'Julio Calleigh' },
        { username: 'Blerta Andromeda' },
        { username: 'Lommán Arun' },
        { username: 'Albino Ojigkwanong' },
        { username: 'Mihaela Dinah' },
        { username: 'Jilly Branwen' },
        { username: 'Landebert Vitali' },
        { username: 'Nnenne Nursultan' },
        { username: 'Marly Žofie' },
        { username: 'Janka Anwar' },
        { username: 'Julio Calleigh' },
        { username: 'Blerta Andromeda' },
        { username: 'Lommán Arun' },
        { username: 'Albino Ojigkwanong' },
        { username: 'Mihaela Dinah' },
        { username: 'Jilly Branwen' },
        { username: 'Landebert Vitali' },
        { username: 'Nnenne Nursultan' },
        { username: 'Marly Žofie' },
        { username: 'Janka Anwar' },
        { username: 'Julio Calleigh' },
        { username: 'Blerta Andromeda' },
        { username: 'Lommán Arun' },
        { username: 'Albino Ojigkwanong' },
        { username: 'Mihaela Dinah' },
        { username: 'Jilly Branwen' },
        { username: 'Landebert Vitali' },
        { username: 'Nnenne Nursultan' },
        { username: 'Marly Žofie' },
      ]
    }
  }*/
}
</script>

<style lang="scss" scoped>
.player-list {
  overflow-y: auto;
  display: flex;
  justify-content: center;

  &::-webkit-scrollbar {
    width: 5px;
    padding-left: 5px;
    border-radius: 2px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #333;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
}

.player-list__content {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  height: 0px;
  margin: 0 auto;
  // justify-content: center;
}

// TODO: Fix low screen width problems.

.player-list__player {
  width: 33%;
  min-height: calc(100 / 5 * 1%);

  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #222;

  &-content {
    display: flex;
    flex: 1 0 auto;
    justify-content: center;
    align-items: flex-start;
    text-align: center;
  }
}

.text--subtitle {
  text-decoration: none;

  &:hover {
    color: #fff;
    text-decoration: line-through;
  }
}
</style>