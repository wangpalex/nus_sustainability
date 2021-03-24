import Home from './components/Home.vue'
import Exchange from './components/Exchange.vue'
import Events from './components/Events.vue'
import Settings from './components/Settings.vue'

export default[
    {path: '/', component: Home},
    {path: '/exchange', component: Exchange},
    {path: '/events', component: Events},
    {path: '/settings', component: Settings}
]   