import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'

import UserForm from './modules/users/UserForm.vue'
import TaskForm from './modules/tasks/TaskForm.vue'

const routes = [{
    path: '/users',
    component: UserForm
  },
  {
    path: '/tasks',
    component: TaskForm
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