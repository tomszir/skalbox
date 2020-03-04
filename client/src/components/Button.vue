<template>
  <div class="button">
    <button>
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<style lang="scss" scoped>
.button {
  button {
    cursor: pointer;

    display: block;
    width: 100%;

    outline: none;
    border: 1px solid transparent;
    border-radius: 2px;

    padding: 10px 15px;

    font-size: 18px;
    font-family: "Poppins", sans-serif;

    color: #d1d1d1;
    background-color: #222;

    &:hover,
    &:focus {
      background-color: #333;
      border: 1px solid #555;
    }
  }

  &--success {
    $success-bg-color: #49775c;

    & button {
      border: 1px solid $success-bg-color;

      &:hover,
      &:focus {
        border: 1px solid lighten($success-bg-color, 5%);
      }
    }
  }

  &--danger {
    $danger-bg-color: #e53232;

    & button {
      border: 1px solid $danger-bg-color;

      &:hover,
      &:focus {
        border: 1px solid lighten($danger-bg-color, 5%);
      }
    }
  }

  &--disabled {
    $disabled-bg-color: #111;
    $disabled-border-color: #333;

    cursor: not-allowed;

    & button {
      user-select: none;
      pointer-events: none;

      background-color: $disabled-bg-color;
      border: 1px solid $disabled-border-color;
    }
  }

  &[type="success"] {
    @extend .button--success;
  }

  &[type="danger"] {
    @extend .button--danger;
  }

  &[disabled] {
    @extend .button--disabled;
  }
}
</style>