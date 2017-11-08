<template>
  <div class="chart-holder">
    <canvas id="chart" width="250" height="250"></canvas>
  </div>
</template>

<script>
  import Chart from 'chart.js'

  export default {
    name: 'chart-view',
    props: {
      poll: {
        type: Object,
        required: true
      },
      chartType: {
        type: String,
        default: 'pie'
      }
    },
    data () {
      return {
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
        pollChart: null
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
      populateChart () {
        const ctx = document.getElementById('chart');
        if (this.pollChart) this.pollChart.destroy();
        //eslint-disable-next-line
        let chartData = {
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
        }
        if (this.chartType === 'bar') {
          chartData.options.scales = {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
        this.pollChart = new Chart(ctx, chartData);
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