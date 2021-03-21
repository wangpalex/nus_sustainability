import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Routes from './routes'

Vue.config.productionTip = false
Vue.use(VueRouter)

// globally registered components
// Vue.component(PageContent)

const myRouter = new VueRouter({
    routes: Routes,
    mode: 'history'
})

new Vue({
    render: h => h(App),
    router: myRouter
}).$mount('#app')
