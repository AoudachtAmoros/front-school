import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import store from './store/index.js'
import './assets/tailwind.css'
import router from './core/router'
import VueSocketIO from 'vue-socket.io'

import "@/assets/style.css"
Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuesax)

Vue.config.productionTip = false;
Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://localhost:7000'
}));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
