<template>
  <div id="poll-fields">
    <h1>Create New Poll</h1>
    <h2 v-if="submitted">Poll Submitted!</h2>
    <div class="poll-field">
      <p>New Poll Name: </p>
      <input type="text" v-model="pollName">
    </div>
    <div class="poll-field" v-for="(option, index) in options">
      <p>Option {{index + 1}}: </p>
      <input type="text" v-model="option.name">
      <button class="button is-danger" @click="removeOption(index)">Remove Option</button>
    </div>
    <button class="button is-primary" @click="newOption">New Option</button>
    <button class="button is-primary" @click="submitPoll">Submit Poll</button>
  </div>
</template>

<script>
  import gateway from '../controllers/clickController.client'

  export default {
    name: 'new-poll',
    data () {
      return {
        pollName: '',
        options: [
          {
            name: '',
            votes: 0
          },
          {
            name: '',
            votes: 0
          }
        ],
        emptyOption: {
          name: '',
          votes: 0
        },
        submitted: false
      }
    },
    methods: {
      newOption () {
        this.options.push(this.emptyOption);
      },
      removeOption (index) {
        this.options.splice(index, 1);
      },
      submitPoll () {
        gateway.addPoll(this.pollName, this.options);
        this.clearPoll();
        this.submitted = true;
        window.setTimeout(() => {
          this.submitted = false;
        }, 2000);
      },
      clearPoll () {
        this.pollName = '';
        this.options = [this.emptyOption, this.emptyOption];
      }
    }
  }
</script>

<style>
  #poll-fields {
    margin-top: 5%;
    text-align: center;
  }
</style>