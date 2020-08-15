import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from './http'
import './style.css'

Vue.config.productionTip = false

Vue.prototype.$http = http

// 把公共资源混入其他组件 一定要写在new Vue前面
Vue.mixin({
  computed: {
    // 上传图片的路径
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    // 上传文件的时候进行调用，获取token，并携带，不然无法上传
    getAuthHeaders() {
      return {
        Authorization : `Bearer ${localStorage.token || ''}`
      }
    }
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
