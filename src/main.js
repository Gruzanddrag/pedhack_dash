import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import Axios from 'axios'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import { tokenHandler } from "./mixins/errorTokenHandlin";

sync(store, router)

Vue.config.productionTip = false

var vm = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
