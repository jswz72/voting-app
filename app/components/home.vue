<template>
  <div>
    <div>
      <div id="textbox" class="column is-half is-offset-one-quarter">
        <h1>Free Code Camp Voting App</h1>
        <p>Select a poll to see the results and vote, or
          <span v-if="!userSignedIn">
            <router-link to="/signin">
              sign-in
            </router-link>
            to
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
          <tr><td @click="select(poll.title)" :class="{'selected': isSelected(poll.title)}">{{poll.title}}<span class="time">{{poll.date | dateFormat}}</span></td></tr>
          <poll-view v-if="isSelected(poll.title)" :poll="poll"></poll-view>
        </template>
        </tbody>
        <p v-else>No Polls Found!</p>
      </table>
    </div>
  </div>
</template>

<script>
  import PollView from './poll-view.vue'
  import controller from '../controllers/clickController.client'

  export default {
    name: 'home',
    components: { PollView },
    data () {
      return {
        selected: null,
        polls: []
      }
    },
    mounted () {
      console.log(this.polls.length);
      this.getPolls();
    },
    computed: {
      userSignedIn () {
        return true; //test data
      }
    },
    filters: {
      dateFormat: function (date) {
        const dt = new Date(date);
        const dtString = dt.toString().split(' ');
        dtString.splice(5, 1);
        return dtString.join(' ');
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
      getPolls () {
        controller.getPolls().then(polls => {
          console.log(polls);
          this.polls = polls;
        })
      },
      isSelected (item) {
        return item === this.selected
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

  table {
    margin-top: 4%;
    border: 1px #888888 solid;
    box-shadow: 3px 3px 5px #888888 ;
    width: 100%;
    display: table;
  }

  td {
    cursor: pointer;
    text-align: center;
    font-size: 1.5em;
  }

  .selected {
    background-color: #ACCEF7;
  }

  .selected:hover {
    background-color: #ACCEF7 !important;
  }

  .time {
    float: right;
  }
</style>
