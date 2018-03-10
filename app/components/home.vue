<template>
  <div>
    <div>
      <div id="textbox" class="column is-half is-offset-one-quarter">
        <h1>Free Code Camp Voting App</h1>
        <p v-if="!authenticated">
          Select a poll to see the results, or
          <router-link to="/signin">sign in</router-link>
          to make polls and vote!
        </p>
        <p v-else>Select a poll to see the results and vote, or create a
          <router-link to="/newpoll">new poll</router-link>
        </p>
      </div>
    </div>
    <div>
      <table v-if="polls.length > 0" align="center" class="table is-striped">
        <tbody>
        <template v-for="poll in sortedPolls">
          <tr>
            <td style="padding-left:1.5em;" @click="select(poll.title)" :class="{'selected': isSelected(poll.title)}">
              {{poll.title}}<span class="time">{{poll.user}}: {{poll.date | dateFormat}}</span>
            </td>
          </tr>
          <poll-view v-if="isSelected(poll.title)" :poll="poll" :authenticated="authenticated"></poll-view>
        </template>
        </tbody>
      </table>
      <p v-else>{{emptyMessage}}</p>
    </div>
  </div>
</template>

<script>
  import PollView from './poll-view.vue'
  import controller from '../controllers/controller'

  export default {
    name: 'home',
    components: { PollView },
    props: {
      authenticated: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    data () {
      return {
        selected: null,
        polls: [],
        emptyMessage: ''
      }
    },
    mounted () {
      this.getPolls();
    },
    computed: {
      sortedPolls () {
        return this.polls.reverse();
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
        this.emptyMessage = 'Loading...';
        controller.getPolls().then(polls => {
          if (polls.length === 0) {
            this.emptyMessage = 'No Polls Found';
          } else {
            this.emptyMessage = '';
            this.polls = polls;
          }
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
    position: relative;
    cursor: pointer;
    text-align: center;
    font-size: 1.5em;
    padding: 40px;
  }

  .selected {
    background-color: #bcdeff;
    color: #828386;
  }

  .selected:hover {
    background-color: #bcdeff !important;
  }

  .time {
    position: absolute;
    float: right;
    font-size:0.65em;
    bottom: 0;
    right: 0;
    color: #;
  }
</style>
