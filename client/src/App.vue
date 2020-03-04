<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Poppins|Source+Sans+Pro&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body,
html,
.app {
  height: 100%;
}

body {
  background-color: #111;
}

.handle-word-break {
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

.text {
  @extend .handle-word-break;

  color: #a1a1a1;
  font-size: 14px;

  & > * {
    display: inline-block;
  }

  &--title {
    color: #eee;
    font-size: 48px;
    font-family: "Poppins", sans-serif;
  }

  &--subtitle {
    color: #d1d1d1;
    font-size: 36px;
    font-family: "Poppins", sans-serif;
  }

  &--bold {
    font-weight: bold;
  }
}

.link {
  color: #fff;
  font-size: 15px;

  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>