import Vue from 'vue'
import Vuex from 'vuex'
import {
  usersList,
  tasksList
}
from './mock.js'

Vue.use(Vuex)

const TASK_STATUS = [{
    id: 'CREATED',
    name: 'Created'
  },
  {
    id: 'RUNNING',
    name: 'Running'
  },
  {
    id: 'CANCELED',
    name: 'Canceled'
  },
  {
    id: 'SUSPENDED',
    name: 'Suspended'
  },
  {
    id: 'COMPLETED',
    name: 'Completed'
  },
]

function getStatusByID(id) {
  return TASK_STATUS.filter((status) => status.id == id)[0]
}

const state = {
  users: [],
  currentUsersList: [],
  tasks: []
}

const getters = {
  users: (state) => state.currentUsersList,
  tasks: (state) => state.tasks,
  taskStatusList: (state) => TASK_STATUS,
}

const actions = {
  loadUsers: (context) => {
    console.log("Context:", context)
    context.commit("loadUsers", usersList)
  },
  loadTasks: (context) => {
    console.log("Context:", context)
    context.commit("loadTasks", tasksList)
  },
  saveTask: (context, task) => {
    console.log("Context:", context)
    console.log("Task: ", task)
    context.commit("saveTask", task)
  },
  saveUser: (context, user) => {
    console.log("Context:", context)
    console.log("User: ", user)
    context.commit("saveUser", user)
  },
  searchUser: (context, query) => {
    context.commit('loadUsers', context.state.users.filter(val => {
      let lowCaseName = val.name.toLowerCase()
      let lowCaseUsername = val.username.toLowerCase()
      let lowCaseEmail = val.email.toLowerCase()
      let lowCaseQuery = query.trim().toLowerCase()
      return (lowCaseName.indexOf(lowCaseQuery) >= 0) || (lowCaseUsername.indexOf(lowCaseQuery) >= 0) || (lowCaseEmail.indexOf(lowCaseQuery) >= 0)
    }))
  },
  deleteUserById: (context, id) => {
    context.commit("deleteUserById", id)
  }
}

const mutations = {
  loadUsers: (state, list) => {
    if (state.users.length < 1) {
      state.users = list
    }
    state.currentUsersList = list
  },
  loadTasks: (state, list) => {
    state.tasks = list
  },
  saveTask: (state, task) => {
    if (!task.id) {
      task.id = state.tasks.length + 1
      task.status = getStatusByID('CREATED')
    }
    state.tasks = [...state.tasks, task]
  },
  saveUser: (state, user) => {
    user.id = state.users.length + 1
    state.users = [...state.users, user]
  },
  deleteUserById: (state, id) => {
    let index = state.users.findIndex((user) => {
      return (user.id == id);
    });
    state.users.splice(index, 1)
  }
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})