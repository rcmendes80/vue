import Vue from 'vue'
import Vuex from 'vuex'
import {
  HTTP
} from './http-commons.js';
import axios from 'axios';
Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  list: [],
  errors: [],
  count: 0,
  editedTodo: {
    name: '',
    due: new Date(),
    completed: false
  },
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  increment: state => state.count++,
  increment2: (state, n) => state.count += n,
  decrement: state => state.count--,
  loadTodoList(state) {
    HTTP.get("todos")
      .then(response => {
        state.list = response.data;
      })
      .catch(e => {
        state.errors.push(e);
      });
  },
  addTodo: (state, todo) => {
    let todoAsJSON = JSON.stringify(todo);
    HTTP.post(`todos`, todoAsJSON)
      .then(response => {
        if (response.status == 201) {
          state.list = [...state.list, response.data];
        }
      })
      .catch(e => {
        state.errors.push(e)
      })


  },
  updateTodoStatus: (state, {
    todo,
    isChecked
  }) => {
    todo.completed = isChecked;
    let todoAsJSON = JSON.stringify(todo);
    HTTP.put("todos/" + todo.id, todoAsJSON)
      .then(response => {
        if (response.status != 204) {
          todo.completed = !isChecked;
        }
      })
      .catch(e => {
        state.errors.push(e)
      })


  },
  deleteTodo: (state, id) => {
    let index = getTodoIndexByID(state, id);

    HTTP.delete("todos/" + id)
      .then(response => {
        if (response.status == 204) {
          state.list.splice(index, 1);
        }
      })
      .catch(e => {
        state.errors.push(e)
      })
  },
  updateTodo: (state, id) => {
    let index = getTodoIndexByID(state, id);

    HTTP.put("todos/" + id)
      .then(response => {
        let status = response.status;
        if (status == 200 || status == 204) {
          //state.list.splice(index, 1);
          console.log("Update com sucesso!")
        }
      })
      .catch(e => {
        state.errors.push(e)
      })
  },
  editTodo: (state, item) => {

  },
}

function getTodoIndexByID(state, id) {
  return state.list.findIndex((element, i) => {
    if (element.id === id) {
      return true;
    }

    return false
  });
}








// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  increment: ({
    commit
  }) => commit('increment'),
  decrement: ({
    commit
  }) => commit('decrement'),
  incrementIfOdd({
    commit,
    state
  }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync({
    commit
  }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  },
  loadTodoList({
    commit,
    state
  }) {

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