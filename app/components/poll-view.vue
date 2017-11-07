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
        <canvas v-if="totalVotes > 0" id="chart" width="250" height="250"></canvas>
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
  import controller from '../controllers/clickController.client'
  import Chart from 'chart.js'
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
        userVoted: false,
        chartType: 'pie',
        baseColors: [
          'rgba(255, 99, 132',
          'rgba(54, 162, 235',
          'rgba(96, 255, 152',
          'rgba(231, 96, 255',
          'rgba(255, 220, 96',
          'rgba(255, 181, 96',
          'rgba(96, 255, 252',
          'rgba(255, 96, 220'
        ],
        charts: ['pie', 'doughnut', 'bar']
      }
    },
    mounted () {
      this.populateChart();
    },
    computed: {
      labels () {
        return this.poll.options.map(option => option.name);
      },
      votesPerLabel () {
        return this.poll.options.map(option => option.votes);
      },
      fillColors () {
        return this.baseColors.map(color => color + ', 0.2)');
      },
      borderColors () {
        return this.baseColors.map(color => color + ', 1.0)');
      },
      displayLegend () {
        return this.chartType !== 'bar';
      },
      totalVotes () {
        return this.votesPerLabel.reduce((sum, val) => sum + val);
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
      },
      populateChart () {
        const ctx = document.getElementById('chart');
        //eslint-disable-next-line
        let pollChart = new Chart(ctx, {
          type: this.chartType,
          data: {
            labels: this.labels,
            datasets: [{
              label: '# of Votes',
              data: this.votesPerLabel,
              backgroundColor: this.fillColors.slice(0, this.labels.length),
              borderColor: this.borderColors.slice(0, this.labels.length),
              borderWidth: 1
            }]
          },
          options: {
            legend: {
              display: this.displayLegend
            },
            responsive: true,
            maintainAspectRatio: false
          }
        })
      }
    },
    watch: {
      chartType () {
        this.populateChart();
      },
      votesPerLabel () {
        this.populateChart();
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