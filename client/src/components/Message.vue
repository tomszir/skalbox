<template>
  <div class="message" :type="type">
    <div class="message__content">
      <div class="text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    type: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  padding: 5px 15px;
  background-color: #222;

  border: 1px solid #333;
  border-radius: 2px;

  &--danger {
    background-color: lighten(#e53232, 15%);
    border: 1px solid #e53232;

    & .text {
      color: #fff;
    }
  }

  &[type="danger"] {
    @extend .message--danger;
  }
}
</style>