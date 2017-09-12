<template>
    <div id="poll-fields">
        <h1>Create New Poll</h1>
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
  data() {
    return {
      pollName: '',
      options: [
        {
          name: ''
        },
        {
          name: ''
        }
      ]
    }
  },
  methods: {
    newOption(){
      this.options.push({name: ''});
    },
    removeOption(index){
      this.options.splice(index, 1);
    },
    submitPoll(){
      gateway.addPoll(this.pollName, this.options);
    }
  }
}
</script>

<style>
    #poll-fields{
        margin-top:5%;
        text-align: center;
    }
</style>