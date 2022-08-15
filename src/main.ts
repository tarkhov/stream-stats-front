import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'
import auth from './auth'
import 'vue3-easy-data-table/dist/style.css'

createApp(App)
  .use(http)
  .use(router)
  .use(auth)
  .mount('#app')
