import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Carousel3d from 'vue-carousel-3d'
import InstantSearch from 'vue-instantsearch'
import VueYoutube from 'vue-youtube'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(firestorePlugin)
Vue.use(InstantSearch)
Vue.use(VueYoutube)
Vue.use(VueAnalytics, {
  id: 'UA-185375118-1',
  router
})
Vue.use(Carousel3d)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
