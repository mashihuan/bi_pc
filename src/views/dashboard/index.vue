<template>
  <div class="preview">
    <Recursion :list="layout" @handleMapClick="handleMapClick"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Row from '@/components/Row'
import LineChart from '@/components/Chart/LineChart'
import BarChart from '@/components/Chart/BarChart'
import PieChart from '@/components/Chart/PieChart'
import MapChart from '@/components/Chart/MapChart'
import GraphChart from '@/components/Chart/GraphChart'
import Map3DChart from '@/components/Chart/Map3DChart'

import Recursion from './children/recursion'
import { getLayoutInfo } from '@/api/menu'

export default {
  components: {
    Row,
    LineChart,
    BarChart,
    PieChart,
    MapChart,
    GraphChart,
    Map3DChart,
    Recursion
  },
  computed: {
    ...mapState('layout', ['layout'])
  },
  methods: {
    handleMapClick({name, charts}) {
      this.changeSpaceData(this.layout, charts, name)
    },
    // 发送请求
    async changeSpaceData(layout, charts, name) {
      layout.forEach(item => {
        if (item.cols) {
          this.changeSpaceData(item.cols, charts, name)
        }
        if (item.children) {
          this.changeSpaceData(item.children, charts, name)
        }
        if (item.config && item.config.dataSourceId) {
          charts.forEach((chart, ind) => {
            if (chart.name && chart.uniqueId === item.uniqueId) {
              getLayoutInfo({
                data: {
                  id: item.config.dataSourceId,
                  queryType: 'METHOD',
                  [chart.name]: name
                }
              }).then(res => {
                if (res.data.data.chartData) {
                  item.config.chartData = res.data.data.chartData
                }
                if (res.data.data.chartX) {
                  item.config.chartX = res.data.data.chartX
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
