import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BugDetails from './views/Details.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'Home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/home/:id',
      name: 'BugDetails',
      component: BugDetails,
      props: true
    }
  ]
})
