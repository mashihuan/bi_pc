<template>
  <div class="chart-wrapper" :class="{corner: false}">
    <div
      class="chart-inner"
      :class="{corner: false}"
      :style="{background: config.background, height: innerHeight}"
    >
      <h4
        class="title"
        :style="{background: config.background,color: config.fontColor}"
      >
        {{ config.title }}
      </h4>
      <div ref="myChart" class="myChart" :style="{height: chartHeight}" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import loadingConfig from './mixins/loadingConfig'

export default {
  mixins: [resize],
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    config: {
      deep: true,
      handler(val) {
        this.initChart(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myChart)
      this.setOptions()
    },
    convertData() {
      const series = this.config.chartData.map((item, index) => {
        return {
          name: item.name,
          data: item.data,
          type: 'bar',
          stack: this.config.stack,
          barWidth: 12,
          itemStyle: {
            barBorderRadius: this.config.stack ? [0, 0, 0, 0] : (this.config.horizontal ? [0, 15, 15, 0] : [15, 15, 0, 0]),
            color: this.config.colors[index]
          }
        }
      })
      return series
    },
    setOptions() {
      if(this.config.loading) {
        this.chart.showLoading(loadingConfig)
      }else {
        this.chart.hideLoading()
      }
      const xaxisData = this.config.horizontal ? { type: 'value' } : { data: this.config.chartX }
      const yaxisData = this.config.horizontal ? { data: this.config.chartX, type: 'category' } : {}
      this.chart.setOption({
        color: this.config.colors,
        grid: {
          left: 0,
          top: 30,
          bottom: 30,
          right: 0,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          axisPointer: {
            type: 'none'
          }
        },
        xAxis: Object.assign({
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: this.chartLabelColor
          }
        }, xaxisData),
        yAxis: Object.assign({
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: this.chartLabelColor
          },
          splitLine: {
            lineStyle: {
              color: this.chartLineColor
            }
          }
        }, yaxisData),
        series: this.convertData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/chart.scss';
</style>
