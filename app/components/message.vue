<template>
  <div v-if="!suppressMessage && message !== ''" class="message-box" :style="`background-color: ${messageColor}`">
    <span class="message-x button is-danger is-inverted" @click="suppressMessage = true;">
      <i class="fa fa-times"></i>
    </span>
    <div class="message">
      <p>{{message}}</p>
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
      if (this.options.timeout > 0) {
        setTimeout(() => this.suppressMessage = true, 2000);
      }
    }
  }
}

</script>

<style lang="scss">

$radius: 0.75em;
$message-padding: 1em;

.message-box {
  min-height: 3em;
  min-width: 12em;
  top: 0;
  position: sticky;
  float: right;
  z-index: 100;
  border-radius: $radius;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message {
  background-color: inherit;
  font-size: 1.1em;
  text-align: center;
  color: white;
  border-radius: $radius;
  width: 80%;
}

.message-x {
  position: absolute;
  transform: scale(0.5);
  top: -0.3em;
  right: -0.3em;
  border-radius: .5em;
}
</style>