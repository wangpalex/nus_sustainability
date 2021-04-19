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
  }
});

const myRouter = new VueRouter({
  routes:Routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')

