<template>
  <div v-if="showMessage" class="message-box">
    <div class="message-content" :style="{'background-color': (status) ? 'green': 'red'}">
      <div class="message">
        <slot>{{message}}</slot>
      </div>
      <span class="message-x button is-danger is-inverted is-small" @click="closeMessage">
        <i class="fa fa-times"></i>
      </span>
    </div>
  </div>
</template>

<script>

import bus from '../bus'

export default {
  name: 'message',
  props: {
    message: {
      type: String
    },
    status: {
      type: Boolean,
      required: true
    },
    showMessage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    closeMessage () {
      bus.$emit('messageClosed', this.message);
    }
  }
}

</script>

<style>

.message-box {
  height: 36px;
  position: fixed;
  right: 0;
  width: 100px;
}

.message-content {
  text-align: center;
  color: white;
  height: inherit;
}

.message {
  display: inline-block;
  background-color: inherit;
  font-size: 1.5em;
}

.message-x {
  float: right;
  margin-right: 0.25em;
  height: 1.5em;
  width: 1.5em;
}
</style>