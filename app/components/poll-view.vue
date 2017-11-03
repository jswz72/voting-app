<template>
  <div>
    <ul>
      <li v-for="option in poll.options">
        {{option.name}}<input type="radio" :id="option.name" :value="option.name" v-model="voteOption">
      </li>
    </ul>
    <button class="button is-success" v-on:click="vote">Submit</button>
  </div>
</template>

<script>
  import controller from '../controllers/clickController.client'
  export default {
    name: 'poll-view',
    props: {
      poll: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        voteOption: ''
      }
    },
    methods: {
      vote () {
        console.log('voting');
        controller.vote('random', 'random')
      }
    }
  }
</script>