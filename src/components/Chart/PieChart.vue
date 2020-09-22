<template>
  <div class="chart-wrapper" :class="{corner: false}">
    <div class="chart-inner" :class="{corner: false}"
          :style="{background: config.background, height: innerHeight}">
      <h4 class="title"
          :style="{background: config.background,color: config.fontColor}">
        {{config.title}}
      </h4>
      <div ref="myChart" class="myChart" :style="{height: chartHeight}"/>
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
      chart: null,
    }
  },
  watch: {
    config: {
      deep: true,
      handler(val) {
        this.setOptions(val)
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
    setOptions() {
      if(this.config.loading) {
        this.chart.showLoading(loadingConfig)
      }else {
        this.chart.hideLoading()
      }
      this.chart.setOption({
        color: this.config.colors,
        grid: {
          left: 0,
          top: 40,
          bottom: 30,
          right: 0,
          containLabel: true
        },
        tooltip: {},
        series: [
          {
            type: 'pie',
            roseType: this.config.roseType,
            radius: [this.config.radius1 + '%', this.config.radius2 + '%'],
            name: this.config.title,
            data: this.config.chartData,
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/chart.scss';
</style>
