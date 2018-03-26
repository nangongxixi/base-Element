<<<<<<< HEAD
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/element-variables.scss'
import './assets/css/theme.css'

Vue.config.productionTip = false
Vue.use(ElementUI, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
=======
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/element-variables.scss'
import './assets/css/theme.css'

Vue.config.productionTip = false
Vue.use(ElementUI, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
