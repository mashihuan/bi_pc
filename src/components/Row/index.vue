<template>
  <el-row :gutter="20">
    <el-col :md="col.col"
            v-for="(col,ind) of colsList"
            :key="ind">
      <draggable class="content"
                  handle=".move"
                  :list="col.children"
                  :group="{name: 'common'}"
                  :move="handleDragForbidMove"
                  @change="setUniqueId">
        <div style="position:relative"
              v-for="(item,index) of col.children"
              :key="item.uniqueId">
        </div>
      </draggable>
    </el-col>
  </el-row>
</template>

<script>
import Draggable from 'vuedraggable'
import { getInstanceByDom } from 'echarts/lib/echarts'

export default {
  components: {
    Draggable,
  },
  props: {
    cols: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      colsList: this.cols,
      drawer: false,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/row.scss';
</style>
