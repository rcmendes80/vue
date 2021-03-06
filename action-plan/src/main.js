import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'

import UserList from './modules/users/UserList.vue'
import TaskList from './modules/tasks/TaskList.vue'
import Home from './modules/home/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home
  },
  {
    path: '/users',
    component: UserList
  },

  {
    path: '/tasks',
    component: TaskList
  }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})