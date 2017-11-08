<template>
  <div class="poll-view">
    <h1 id="poll-title">Vote on Poll: {{poll.title}}</h1>
    <div class="holder">
      <div class="options">
        <p style="margin-bottom: 0.5em;">Options:</p>
        <ul>
          <li v-for="option in poll.options">
            <div class="field">
              <div class="control">
                <label class="radio">
                  <input type="radio" :id="option.name" :value="option.name" v-model="voteOption">
                  {{option.name}}
                </label>
              </div>
            </div>
          </li>
        </ul>
        <button class="button is-success" v-on:click="vote">Submit</button>
      </div>
      <div class="chart-holder">
        <!--todo make chart component-->
        <chart-view v-if="totalVotes > 0" :poll="poll" :chartType="chartType"></chart-view>
        <p v-else style="text-align: center;">No votes yet!</p>
      </div>
      <div>
        <div class="field">
          <label class="label">Chart:</label>
          <div class="control">
            <div class="select">
              <select v-model="chartType">
                <option v-for="chart in charts">{{chart}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChartView from './chart-view.vue'
  import controller from '../controllers/clickController.client'
  export default {
    name: 'poll-view',
    components: { ChartView },
    props: {
      poll: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        voteOption: '',
        userVoted: false,
        charts: ['pie', 'doughnut', 'bar'],
        chartType: 'pie'
      }
    },
    computed: {
      totalVotes () {
        let votes = 0;
        this.poll.options.forEach(option => {
          votes += option.votes;
        });
        return votes;
      }
    },
    methods: {
      vote () {
        if (this.voteOption === '') {
          return;
        }
        controller.vote(this.poll.title, this.voteOption);
        const option = this.poll.options.find(option => option.name === this.voteOption);
        option.votes++;
        this.userVoted = true;
      }
    }
  }
</script>

<style>
  .poll-view {
    box-shadow: 1px 1px 5px #888888 ;
    width: 100%;
  }

  #poll-title {
    text-align: center;
    font-size: 1.75em;
  }

  .holder {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 1.5em 0 1.5em 0;
  }

  .chart-holder {
    height: 250px;
    width: 250px;
  }
</style>