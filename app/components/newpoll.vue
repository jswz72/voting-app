<template>
  <div>
    <h1 class="title">Create New Poll</h1>
    <div v-if="authenticated" id="poll-fields">
      <h2 v-if="submitted">Poll Submitted!</h2>
      <div class="field">
        <label class="label is-medium">Name</label>
        <p class="control">
          <input class="input is-medium" type="text" placeholder="Poll Name" v-model="pollName">
        </p>
      </div>
      <div v-for="(option, index) in options">
        <div class="poll-option">
          <div class="field">
          <label class="label is-medium">Option {{index + 1}}</label>
          </div>
          <div class="field has-addons">
            <p class="control is-expanded">
              <input class="input" type="text" placeholder="Option" v-model="option.name">
            </p>
            <p class="control" v-if="index > 1">
              <span class="button is-danger" @click="removeOption(index)">Remove Option</span>
            </p>
          </div>
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <span class="button is-primary" @click="newOption">New Option</span>
        </p>
        <p class="control">
          <span class="button is-primary" @click="submitPoll">Submit Poll</span>
        </p>
      </div>
    </div>
    <div v-else>
      <p>Must be logged in to create new poll!</p>
    </div>
  </div>
</template>

<script>
  import gateway from '../controllers/controller'

  export default {
    name: 'new-poll',
    props: {
      authenticated: {
        type: Boolean,
        required: true,
        default: false
      }
    },
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
  }

  .title {
    font-size: 30px;
    text-align: center;
    margin-top: 1%;
  }

  .label {
    text-align: left;
  }

  .poll-option {
    margin-bottom: 1%;
  }

</style>