import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import SingleUpload from './components/single-upload'
import multiUpload from './components/multi-upload.vue'
import Dropzone from './components/dropzone.vue'

Vue.component('single-upload', SingleUpload)
Vue.component('multi-upload', multiUpload)
Vue.component('dropzone', Dropzone)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
