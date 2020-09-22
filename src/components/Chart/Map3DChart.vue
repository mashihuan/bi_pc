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
import { mapState, mapMutations } from 'vuex'
import echarts from 'echarts'
import 'echarts-gl'

import loadingConfig from './mixins/loadingConfig'

import resize from './mixins/resize'
import nantongJson from '@/static/nantong.js'

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
  computed: {
    ...mapState('layout', ['layout'])
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
    ...mapMutations('layout', ['SAVE_LAYOUT']),
    initChart() {
      this.chart = echarts.init(this.$refs.myChart)
      echarts.registerMap('nantong', nantongJson)
      this.setOptions()
      this.chart.on('click', this.handleMapClick)
    },
    handleMapClick(e) {
      this.$emit('handleMapClick', {name: e.name, charts: this.config.charts})
    },
    setOptions() {
      if(this.config.loading) {
        this.chart.showLoading(loadingConfig)
      }else {
        this.chart.hideLoading()
      }
      const geoCoordMap = [
        { name: '崇川区', value: [120.932203, 31.911357, '南通市崇川区'] },
        { name: '通州区', value: [121.05163, 32.113882, '南通市通州区'] },
        { name: '如东县', value: [121.090527, 32.386724, '如东县'] },
        { name: '启东市', value: [121.703672, 31.854981, '启东市'] },
        { name: '如皋市', value: [120.573482, 32.268391, '如皋市'] },
        { name: '海门市', value: [121.310107, 31.954154, '海门市'] },
        { name: '海安市', value: [120.478737, 32.550035, '海安市'] }
      ]
      this.chart.setOption({
        geo3D: {
          map: 'nantong',
          viewControl: {
            // rotateSensitivity: 0,
            zoomSensitivity: 0,
            center: [14, -10, -10]
          },
          label: {
            textStyle: {
              color: 'transparent',
              backgroundColor: 'transparent'
            }
          },
          itemStyle: {
            borderColor: '#40A9FE',
            borderWidth: 1,
            color: '#E5F1FD',
            opacity: 0.9
          },
          emphasis: {
            itemStyle: {
              color: '#40A9FE',
              // opacity: 1
            }
          },
          regions: [
            {
              name: '',
              itemStyle: {
                color: '#40A9FE',
                opacity: 1
              }
            }
          ]
        },
        series: [
          {
            type: 'map3D',
            map: 'nantong',
            coordinateSystem: 'geo3D',
            data: geoCoordMap,
            symbol: 'circle',
            symbolSize: 15,
            zlevel: 20,
            viewControl: {
              // rotateSensitivity: 0,
              zoomSensitivity: 0,
              center: [14, -10, -10]
            },
            label: {
              textStyle: {
                color: 'transparent',
                backgroundColor: 'transparent'
              }
            },
            itemStyle: {
              borderColor: '#0233FA',
              borderWidth: 1,
              color: '#0F1F59',
              opacity: 0
            },
            emphasis: {
              itemStyle: {
                color: '#1F65EB',
                opacity: 0
              }
            }
          },
          {
            type: 'scatter3D',
            map: 'nantong',
            coordinateSystem: 'geo3D',
            data: geoCoordMap,
            symbol: 'circle',
            symbolSize: 15,
            zlevel: 10,
            itemStyle: {
              borderColor: '#ffffff',
              borderWidth: 5,
              color: '#FF4D4F'
            },
            label: {
              show: true,
              formatter: '{b}',
              position: 'top',
              textStyle: {
                color: '#000',
                backgroundColor: '#fff'
              }
            }
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
