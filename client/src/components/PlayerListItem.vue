<template>
  <div class="player-list-item"> 
    <div @click="onClick" class="player-list-item__content">
      <div class="text--subtitle">
        {{ player }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerListItem',
  props: {
    player: {
      type: Object,
      require: true
    }
  },
  methods: {
    onClick(e) {
      // ...
    }
  }
}
</script>

<style lang="scss" scoped>
$rows: 3;
$columns: 5;

.player-list-item {
  width: calc(100 / $rows * .99%);
  min-height: calc(100 / $columns * .99%);

  border-bottom: 1px solid #222;

  padding-bottom: 15px;
  margin-bottom: 15px;
}

.player-list-item__content {
  display: flex;
  flex: 1 0 auto;

  align-items: flex-start;
  justify-content: center;

  text-align: center;
}
</style>