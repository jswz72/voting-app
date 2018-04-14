<template>
  <div v-if="!suppressMessage && message !== ''" class="message-box" :style="`background-color: ${messageColor}`">
    <span class="message-x button is-danger is-inverted is-small" @click="suppressMessage = true;">
      <i class="fa fa-times"></i>
    </span>
    <div class="message">
      <div>{{message}}</div>
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
    options: {
      type: Object,
      required: false,
      default: () => ({ status: 'info', timeout: 2000 })
    }
  },
  data () {
    return {
      suppressMessage: false
    }
  },
  mounted () {
    bus.$on('message', this.newMessage);
  },
  computed: {
    messageColor () {
      let color;
      switch (this.options.status) {
        case 'success':
          color = 'rgb(49, 207, 101)';
          break;
        case 'fail':
          color = 'red';
          break;
        case 'info':
        default:
          color = 'rgb(34, 208, 178)';
          break;
      }
      return color;
    }
  },
  methods: {
    newMessage () {
      this.suppressMessage = false;
      setTimeout(() => this.suppressMessage = true, 2000);
    }
  }
}

</script>

<style lang="scss">

$radius: 0.75em;
$message-padding: 1em;

.message-box {
  height: 25%;
  width: 25%;
  top: 0;
  position: sticky;
  float: right;
  z-index: 100;
  border-radius: $radius;
}

.message {
  display: inline-block;
  background-color: inherit;
  font-size: 1.5em;
  text-align: center;
  color: white;
  height: inherit;
  border-radius: $radius;
  padding-left: $message-padding;
  padding-right: $message-padding;
}

.message-x {
  position: absolute;
  transform: scale(0.9);
  top: -0.2em;
  right: -0.2em;
  border-radius: 20px;
}
</style>