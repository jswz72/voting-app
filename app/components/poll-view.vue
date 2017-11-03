<template>
  <div>
    <ul>
      <li v-for="option in poll.options">
        {{option.name}}<input type="radio" :id="option.name" :value="option.name" v-model="voteOption">
        <span v-if="userVoted">{{option.votes}}</span>
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
        voteOption: '',
        userVoted: false
      }
    },
    methods: {
      vote () {
        if (this.voteOption === '') {
          return;
        }
        controller.vote(this.poll.title, this.voteOption);
        this.userVoted = true;
      }
    }
  }
</script>