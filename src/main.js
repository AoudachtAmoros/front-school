import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import store from './store/index.js'
import './assets/tailwind.css'
import router from './core/router'
// import store from './store/index'

import "@/assets/style.css"
Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuesax)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
