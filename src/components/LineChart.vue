<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    :scales-p="scales"
  />
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

// Chart.defaults.borderColor = 'white';

export default {
  name: 'LineChart',
  components: { LineChartGenerator },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    chartData: {
      type: Object,
      default: () => ({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: 'white',
            borderColor: 'white',
            borderWidth: 3,
            pointStyle: 'rectRot',
            pointRadius: 5,
            pointBorderColor: 'white',
            color: 'white',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      }),
    },
    scales: {
      type: Object,
      default: () => ({
        yAxis: {
          grid: {
            borderDash: [4],
            borderColor: "white",
            color: 'white',
            display: true,
            drawBorder: false,
            drawOnChartArea: true,
            drawTicks: true,
          },
          ticks: {
              backdropColor: "white",
              textStrokeColor: 'white',
              color: 'white',
              fontColor: 'white',
          }
        },
        xAxis: {
          grid: {
            display: false,
          },
          ticks: {
              backdropColor: "white",
              textStrokeColor: 'white',
              color: 'white',
              fontColor: 'white',
          }
        }
      })
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    plugins: {
      type: Array,
      default: () => []
    }

  },
  data() {
    return {
      
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          fontColor: 'white',
        },
        animations: {
          tension: {
            duration: 2000,
            easing: 'linear',
            from: 0,
            to: 0.5,
            loop: true
          }
        },
        line: {
          borderWidth: 5,
        },
        plugins: {
          legend: {
            display: false,
            // labels: {
            //   color: 'white',
            //   usePointStyle: true,
            //   font: {
            //       size: 10
            //   }
            // },
            // title: {
            //   color: 'white',
            // }
          }
        }
      }
    }
  }
}
</script>