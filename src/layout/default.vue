<template>
  <el-container>
    <el-header height="50px">
      <my-header/>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import MyHeader from '@/components/Header'

export default {
  name: 'Layout',
  components: {
    MyHeader
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.el-container {
  background: $content-bg;
  .el-header {
    padding-left: 0;
    padding-right: 0;
    background: $header-bg;
    overflow-x: auto;
  }
  .el-main {
    padding: 20PX 50px 0;
  }
}
</style>
