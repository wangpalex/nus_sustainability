import Home from './components/Home.vue'
import Exchange from './components/Exchange.vue'
import Events from './components/Events.vue'
import Settings from './components/Settings.vue'
import Login from './components/Login.vue'
import newItem from './components/newItem.vue'
import DetailsPage from './components/DetailsPage.vue'

export default[
    {path: '/', component: Home},
    {path: '/exchange', component: Exchange},
    {path: '/events', component: Events},
    {path: '/settings', component: Settings},
    {path: '/settings/login', component: Login},
    {path: '/newItem', name: 'newItem', component: newItem},
    {path: '/detailsPage', name: 'detailsPage', component: DetailsPage, props: true}
]   