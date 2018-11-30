import { Line } from 'vue-chartjs'

export default {
  extends: Line,

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

    this.gradient.addColorStop(0, 'rgba(64, 199,65, 0.9)')
    this.gradient.addColorStop(0.5, 'rgba(64, 199, 65, 0.2)')
    this.gradient.addColorStop(1, 'rgba(64, 199, 65, 0)')

    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.2)')
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)')

    const dataSet = {
      labels: ['July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Sample 1',
          borderColor: 'rgba(64, 199,65, 1)',
          pointBackgroundColor: 'rgba(64, 199,65, 1)',
          borderWidth: 1,
          pointBorderColor: 'rgba(64, 199,65, 1)',
          backgroundColor: this.gradient,
          data: [40, 39, 10, 40, 39, 80]
        },
        {
          label: 'Sample 2',
          borderColor: 'rgba(0, 231, 255, 1)',
          pointBackgroundColor: 'rgba(0, 231, 255, 1)',
          pointBorderColor: 'rgba(0, 231, 255, 1)',
          borderWidth: 1,
          backgroundColor: this.gradient2,
          data: [60, 55, 32, 10, 2, 12]
        }
      ]
    }

    this.renderChart(dataSet, options)
  }
}
