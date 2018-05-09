import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from './http-commons.js';

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  list:[],
  errors:[],
  count:0
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  increment: state => state.count++,
  increment2: (state, n) => state.count +=n,
  decrement: state => state.count--,
  loadTodoList(state) {
    HTTP.get("todos")
      .then(response => {
        state.list = response.data;
      })
      .catch(e => {
        console.log(e)
        state.errors.push(e);
      });
  },
  addTodo: (state, todo) => {
    state.list = [...state.list, todo];
    let todoAsJSON = JSON.stringify(todo);
    console.log(todoAsJSON)
    HTTP.post(`todos`, {
      body: todoAsJSON
    })
    .then(response => {console.log("response[POST]:", response)})
    .catch(e => {
      state.errors.push(e)
    })


  },
  updateTodoStatus: (state, {index, isChecked}) => {
    state.list[index].completed = isChecked;
  }
}










// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  },
  loadTodoList({commit, state}) {

  }
}

// getters are functions
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})