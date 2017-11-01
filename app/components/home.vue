<template>
  <div>
    <div>
      <div id="textbox" class="column is-half is-offset-one-quarter">
        <h1>Free Code Camp Voting App</h1>
        <p>Select a poll to see the results and vote, or
          <span v-if="!userSignedIn">
                        <router-link to="/signin">sign-in</router-link>to
                    </span>
          make a
          <router-link v-if="userSignedIn" to="/newpoll">new poll</router-link>
        </p>
      </div>
    </div>
    <div>
      <table align="center" class="table is-striped">
        <tbody v-if="polls.length > 0">
        <template v-for="poll in polls">
          <tr @click="select(poll.title)">{{poll.title}}</tr>
          <template v-if="poll.title === selected">
            <tr v-for="option in poll.options">{{option.name}}: {{option.votes}}</tr>
            <button @click="vote(poll.title, option.name)"></button>
          </template>
        </template>
        </tbody>
        <p v-else>No Polls Found!</p>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    props: {
      polls: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        selected: null
      }
    },
    mounted () {
      console.log(this.polls.length);
    },
    computed: {
      userSignedIn () {
        return true;
      }
    },
    methods: {
      select (pollName) {
        if (this.selected === pollName) {
          this.selected = null;
        } else {
          this.selected = pollName;
        }
      },
      vote (pollName, optionName) {

      }
    }
  }

</script>

<style>
  #textbox {
    margin-top: 70px;
    text-align: center;
  }

  #textbox h1 {
    font-size: 3em;
  }

  #textbox p {
    font-size: 1.2em;
  }

  tr {
    text-align: center;
    font-size: 1.5em;
  }

  /*tr:nth-child(even) {
      background-color: white;
  }

  tr:nth-child(odd){
      background-color: #e8ebef;
  }*/
</style>
