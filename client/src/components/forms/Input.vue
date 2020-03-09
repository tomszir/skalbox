<template>
  <div class="input" :type="type" :disabled="disabled">
    <input
      ref="input"
      
      @input="onInput"
      @change="onChange"

      :value="value"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: {
      type: String,
      default: '',
    },
    maxLength: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput(e) {
      // TODO: Refactor.
      
      const { maxLength } = this;
      
      if (maxLength > 0 && e.target.value.length > maxLength) {
        this.$refs.input.value = e.target.value.substr(0, maxLength);
        return;
      }

      this.$emit('input', e.target.value);
    },

    onChange(e) {
      this.$emit('change', e.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  & input {
    display: block;
    width: 100%;

    outline: none;
    border: 1px solid #333;
    border-radius: 2px;

    padding: 12px 15px;

    font-size: 18px;
    font-family: "Poppins", sans-serif;

    color: #d1d1d1;
    background-color: #222;

    &:hover,
    &:focus {
      background-color: #333;
      border: 1px solid #555;
    }

    &::placeholder {
      color: #d1d1d1;
    }
  }

  &--success {
    $success-bg-color: #49775c;

    & input {
      border: 1px solid $success-bg-color;

      &:hover,
      &:focus {
        border: 1px solid lighten($success-bg-color, 5%);
      }
    }
  }

  &--danger {
    $danger-bg-color: #e53232;

    & input {
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

    & input {
      user-select: none;
      pointer-events: none;

      background-color: $disabled-bg-color;
      border: 1px solid $disabled-border-color;
    }
  }

  &[type="success"] {
    @extend .input--success;
  }

  &[type="danger"] {
    @extend .input--danger;
  }

  &[disabled] {
    @extend .input--disabled;
  }
}
</style>