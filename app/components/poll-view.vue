<template>
  <div class="poll-view">
    <h1 id="poll-title">Vote on Poll: {{poll.title}}</h1>
    <ul>
      <li v-for="option in poll.options">
        {{option.name}}<input type="radio" :id="option.name" :value="option.name" v-model="voteOption">
        <span v-if="userVoted">{{option.votes}}</span>
      </li>
    </ul>
    <button class="button is-success" v-on:click="vote">Submit</button>
    <canvas id="chart" width="250" height="250"></canvas>
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
        ]
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
      }
    },
    methods: {
      vote () {
        if (this.voteOption === '') {
          return;
        }
        controller.vote(this.poll.title, this.voteOption);
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
            responsive: false,
            maintainAspectRatio: false
          }
        })
      }
    }
  }
</script>

<style>
  .poll-view {
    width: 100%;
  }

  #poll-title {
    text-align: center;
    font-size: 2em;
  }
</style>