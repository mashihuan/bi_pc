import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import './permission'
import 'amfe-flexible'
import './plugins/element.js'
import '@/assets/css/reset.scss'
import '@/assets/css/theme-dark.scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
