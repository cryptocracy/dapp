import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,

  data () {
    return {
      gradient: null,
      gradient2: null
    }
  },

  mounted () {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          gridLines: {
            display: false
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      },
      legend: {
        display: true,
        position: 'top',
        fullWidth: true,
        labels: {
          boxWidth: 14,
          fontSize: 14
        }
      }
    }

    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(37, 141, 242, .8)')
    this.gradient.addColorStop(0.5, 'rgba(37, 141, 242, 0.9)')
    this.gradient.addColorStop(1, 'rgba(24, 102, 178, 1)')

    this.gradient2.addColorStop(0, 'rgba(245, 124, 0, 9)')
    this.gradient2.addColorStop(0.5, 'rgba(245, 124, 0, 0.8)')
    this.gradient2.addColorStop(1, 'rgba(245, 124, 0, 1)')

    const dataSet = {
      labels: ['March', 'April', 'May', 'June', 'July', 'August'],
      datasets: [
        {
          label: 'Project 1',
          borderColor: 'rgba(64, 199,65, 1)',
          hoverBackgroundColor: 'rgba(64, 199,65, 1)',
          borderWidth: 1,
          backgroundColor: 'rgba(64, 199,65, 1)',
          data: [40, 39, 10, 40, 39, 80]
        },
        {
          label: 'Project 2',
          borderColor: 'rgba(0, 231, 255, 1)',
          hoverBackgroundColor: 'rgba(0, 231, 255, 1)',
          borderWidth: 1,
          backgroundColor: 'rgba(0, 231, 255, 1)',
          data: [60, 55, 32, 10, 2, 12]
        }
      ]
    }

    this.renderChart(dataSet, options)
  }
}
