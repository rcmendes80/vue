import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const TASK_STATUS = [
  {id:'CREATED', name:'Created'},
  {id:'RUNNING', name:'Running'},
  {id:'CANCELED', name:'Canceled'},
  {id:'SUSPENDED', name:'Suspended'},
  {id:'COMPLETED', name:'Completed'},
]

function getStatusByID(id) {
  return TASK_STATUS.filter((status) => status.id == 'CREATED')[0]
}

const usersList = [{
    id: 1,
    name: "Name 1",
    username: "user 1",
    email: "user1@email.com",
    contact: "1 11 1 1111-1111"
  },
  {
    id: 2,
    name: "Name 2",
    username: "user 2",
    email: "user2@email.com",
    contact: "2 22 2 2222-2222",
  },
  {
    id: 3,
    name: "Name 3",
    username: "user 3",
    email: "user3@email.com",
    contact: "3 33 3 3333-3333",
  },
  {
    id: 4,
    name: "Name 4",
    username: "user 4",
    email: "user4@email.com",
    contact: "4 44 4 4444-4444",
  },
  {
    id: 5,
    name: "Name 5",
    username: "user 5",
    email: "user5@email.com",
    contact: "5 55 5 5555-5555",
  }
]

const tasksList = [
  {
    id: 1, 
    title: "Task 1", 
    responsible: {
      id: 1,
      name: "Name 1",
      username: "user 1",
      email: "user1@email.com",
      contact: "1 11 1 1111-1111"
    }, 
    description: "Description 1.", 
    due: {date:'2018-01-01', time: '13:00'}, 
    status: {id:'CREATED', name:'Created'},
  }
]
const state = {
  users: [],
  tasks: []
}

const getters = {
  users: (state) => state.users,
  tasks: (state) => state.tasks,
  taskStatusList: (state) => TASK_STATUS,
}

const actions = {
  loadUsers : (context) => {
    console.log("Context:", context)
    context.commit("loadUsers", usersList)
  },
  loadTasks : (context) => {
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
  }
}

const mutations = {
  loadUsers : (state, list) => {
    state.users = list
  },
  loadTasks : (state, list) => {
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