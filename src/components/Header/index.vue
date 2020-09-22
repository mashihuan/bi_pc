<template>
  <div style="height: 100%;">
    <el-row>
      <el-col class="logo" :xs="2" :span="4">
        <router-link to="/"><img src="@/assets/img/logo.png" alt=""></router-link>
      </el-col>
      <el-col :span="15">
        <ul class="menu">
          <li class="menu-item"
              v-for="(item,index) of menus"
              :key="item.name"
              :class="{active: active === index}"
              @click="handleSwitchMenu(item, index)">
            {{item.name}}
          </li>
        </ul>
      </el-col>
      <el-col :xs="6" :span="5" class="user">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img class="avatar" src="@/assets/img/avatar.png" />
            {{userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item of themeColors"
              :key="item.name"
              @click.native="switchThemeColor(item)">
              {{item.name}}
            </el-dropdown-item>
            <el-dropdown-item divided  @click.native="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

import Loading from '@/components/Loading'

import { userInfo, logout } from '@/api/user'
import { menuList, spaceDetail, getLayoutInfo } from '@/api/menu'

export default {
  name: 'Header',
  components: {
    Loading
  },
  data() {
    return {
      userName: '',
      active: 0,
      menus: [],
      content: [],
      loading: false,
      themeColors: [
        {name: '浅色主题', class: ''},
        {name: '深色主题', class: 'theme-dark'},
      ]
    }
  },
  computed: {
    ...mapState('layout',['layout', 'activeMenu'])
  },
  mounted() {
    this.active = this.activeMenu || 0
    this.getUserInfo()
    this.getMenus()
  },
  methods: {
    ...mapMutations('layout',['SAVE_LAYOUT','SAVE_ACTIVE_MENU']),
    // 切换菜单
    async handleSwitchMenu(item, index) {
      this.active = index
      this.SAVE_ACTIVE_MENU(index)
      this.getSpaceDetail(item)
    },
    // 获取空间详情
    async getSpaceDetail(item) {
      this.loading = true
      const res  = await spaceDetail({
        data: {
          id: Number(item.path)
        }
      })
      // 请求接口，获取最新数据
      this.content = JSON.parse(res.data.content)
      this.SAVE_LAYOUT(this.content)
      this.getSpaceData(this.content)
      this.loading = false
    },
    // 发送请求
    async getSpaceData(layout) {
      layout.forEach(item => {
        if(item.cols) {
          this.getSpaceData(item.cols)
        }
        if(item.children) {
          this.getSpaceData(item.children)
        }
        if(item.config && item.config.dataSourceId) {
          // item.config.loading = true
          // todo
          getLayoutInfo({
            data: {
              id: item.config.dataSourceId,
              queryType: 'METHOD'
            }
          }).then(res => {
            if(res.data.data.chartData) {
              item.config.chartData = res.data.data.chartData
            }
            if(res.data.data.chartX) {
              item.config.chartX = res.data.data.chartX
            }
            this.SAVE_LAYOUT(this.content)
          })
        }
      })
    },
    // 获取菜单列表
    async getMenus() {
      const res = await menuList({})
      this.menus = res.data || []
      // 获取当前菜单信息
      this.getSpaceDetail(this.menus[this.active])
    },
    // 获取用户信息
    async getUserInfo() {
      const res = await userInfo({
        sessionToken: sessionStorage.getItem('sessionToken')
      })
      this.userName = res.data.name
    },
    // 切换主题颜色
    switchThemeColor(item) {
      document.body.className = item.class
      this.$store.commit('theme/CHANGE_THEME', item.class)
    },
    // 退出
    async handleLogout() {
      const res = await logout({
        sessionToken: sessionStorage.getItem('sessionToken')
      })
      if(res.return_code === 20000) {
        sessionStorage.removeItem('sessionToken')
        sessionStorage.removeItem('activeMenu')
        this.SAVE_LAYOUT([])
        this.SAVE_ACTIVE_MENU(null)
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.el-row {
  display: flex;
  align-items: center;
  min-width: 960PX;
  height: 100%;
  padding-left: 7%;
  padding-right: 7%;
  .logo {
    img {
      display: block;
      width: 36PX;
    }
  }
  .menu {
    display: flex;
    align-items: center;
    .menu-item {
      padding: 8PX 15PX;
      margin-right: 20PX;
      border-radius: 3PX;
      color: #CDCED5;
      cursor: pointer;
      &.active {
        background: #53576E;
        color: #fff;
      }
    }
  }
  .user {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .el-dropdown {
      .el-dropdown-link {
        display: flex;
        align-items: center;
        color: #fff;
        cursor: pointer;
        .avatar {
          width: 26px;
          margin-right: 5px;
        }
      }
    }
  }
}
.el-dropdown-menu {
  padding: 0;
  border: none;
  background: $header-bg;
  .el-dropdown-menu__item {
    color: #fff;
    &.active {
      background: #1B2559;
    }
    &:hover {
      background: transparent;
    }
  }
  ::v-deep.popper__arrow {
    border-width: 0 !important;
    display: none !important;
  }
  .el-dropdown-menu__item--divided:before {
    height: 0px;
  }
}
</style>
