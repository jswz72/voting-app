<template>
  <div>
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
        userVoted: false
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
          type: 'bar',
          data: {
            labels: this.labels,
            datasets: [{
              label: '# of Votes',
              data: this.votesPerLabel,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            responsive: false,
            maintainAspectRatio: false
          }
        })
      }
    }
  }
</script>