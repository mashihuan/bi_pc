<template>
  <div>
    <el-row :gutter="20" v-for="row of list" :key="row.uniqueId">
      <el-col :md="col.col"
            v-for="(col,index) of row.cols"
            :key="index">
        <div v-for="chart of col.children"
              :key="chart.uniqueId">
          <div v-if="chart.cols">
            <!-- 递归组件，支持row嵌套 -->
            <Preview :list="col.children"/>
          </div>
          <component v-else
            :cols="chart.cols"
            :config="chart.config"
            :is="chart.cpnName"
            @handleMapClick="handleMapClick"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Row from '@/components/Row'
import LineChart from '@/components/Chart/LineChart'
import BarChart from '@/components/Chart/BarChart'
import PieChart from '@/components/Chart/PieChart'
import MapChart from '@/components/Chart/MapChart'
import GraphChart from '@/components/Chart/GraphChart'
import Map3DChart from '@/components/Chart/Map3DChart'

export default {
  name: 'Preview',
  components: {
    Row,
    LineChart,
    BarChart,
    PieChart,
    MapChart,
    GraphChart,
    Map3DChart
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleMapClick(param) {
      this.$emit('handleMapClick', param)
    }
  }
}
</script>

<style>

</style>
