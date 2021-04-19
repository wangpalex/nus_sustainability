import Home from './components/Home.vue'
import Exchange from './components/Exchange.vue'
import Events from './components/Events.vue'
import Profile from './components/Profile.vue'
import Login from './components/Login.vue'
import newItem from './components/newItem.vue'
import DetailsPage from './components/DetailsPage.vue'
import EventDetails from './components/EventDetails.vue'
import SignUp from "./components/SignUp";
import About from "@/components/About";

export default[
    {path: '/', component: Home},
    {path: '/exchange', component: Exchange},
    {path: '/events', component: Events},
    {path: '/eventDetails', component: EventDetails, name : 'eventDetails', props:true},
    {path: '/profile', component: Profile},
    {path: '/profile/login', component: Login},
    {path: '/profile/signup', component: SignUp, name:"signup"},
    {path: '/newItem', name: 'newItem', component: newItem},
    {path: '/detailsPage', name: 'detailsPage', component: DetailsPage, props: true},
    {path: '/about', name: 'about', component: About, props: true}
]   