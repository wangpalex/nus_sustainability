import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router' // (Step 1)
import Routes from './routes.js'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import * as VueGoogleMaps from 'vue2-google-maps'

//import VueGoogleApi from 'vue-google-api'

Vue.config.productionTip = false
Vue.use(VueRouter) // (Step 2)
Vue.use(iView);
Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD-enw5hB1RWEUF5cUDM908JknkpotEgVw',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  }
});

const myRouter = new VueRouter({
  routes:Routes,
  mode: 'history'
});

/*
const google_config = {
  apiKey: 'AIzaSyA7SmTjA9zXuByHP64gDLBk6h-SnZEl6I0',
  clientId: 'your_client_id.apps.googleusercontent.rcom',
  scope: 'space_separated_scopes',
  discoveryDocs: [ list_of_discoverydocs_urls ]
}
*/

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')

//Vue.use(VueGoogleApi, google_config)
