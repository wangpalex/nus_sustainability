import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router' // (Step 1)
import Routes from './routes.js'
//import VueGoogleApi from 'vue-google-api'

Vue.config.productionTip = false
Vue.use(VueRouter) // (Step 2)
Vue.config.productionTip = false

const myRouter = new VueRouter({
  routes:Routes,
  mode: 'history'
});

/*
const google_config = {
  apiKey: 'AIzaSyA7SmTjA9zXuByHP64gDLBk6h-SnZEl6I0',
  clientId: 'your_client_id.apps.googleusercontent.com',
  scope: 'space_separated_scopes',
  discoveryDocs: [ list_of_discoverydocs_urls ]
}
*/

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')

//Vue.use(VueGoogleApi, google_config)
