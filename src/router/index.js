import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pools from '../views/Pools.vue'
import Pool from '../views/Pool.vue'
import Team from '../views/Team.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pools',
    name: 'Pools',
    component: Pools
  },
  {
    path: '/pool/:index',
    name: 'Pool',
    component: Pool,
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
