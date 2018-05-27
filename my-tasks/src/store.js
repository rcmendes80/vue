import Vue from 'vue'
import Vuex from 'vuex'
import {
  HTTP
} from './http-commons.js';
import axios from 'axios';
Vue.use(Vuex)


function getCurrentDateTime() {
  let today = new Date();
  let parsedDatetime = today.toISOString().slice(0, 16);

  return parsedDatetime;
}

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  list: [],
  errors: [],
  count: 0,
  editedTodo: {
    name: '',
    due: getCurrentDateTime(),
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
  saveTodo: (state) => {
    let todo = state.editedTodo;
    let todoAsJSON = JSON.stringify(todo);
    console.log("TODO: ", todoAsJSON)
    let clone = JSON.parse(todoAsJSON);
    clone.due = new Date(clone.due);
    todoAsJSON = JSON.stringify(clone);
    console.log("TODO 2: ", todoAsJSON)

    if (todo.id == null || todo.id <= 0) {

      HTTP.post(`todos`, todoAsJSON)
        .then(response => {
          if (response.status == 201) {
            state.list = [...state.list, response.data];
            state.editedTodo = {}
            state.editedTodo.due = this.getCurrentDateTime();
            console.log("Due:", state.editedTodo.due);
          }
        })
        .catch(e => {
          state.errors.push(e)
        })
    } else {
      HTTP.put("todos/" + todo.id, todoAsJSON)
        .then(response => {
          let status = response.status;
          if (status == 200 || status == 204) {
            let index = getTodoIndexByID(state, id);
            state.list[index] = todo;
            console.log("Update com sucesso!")
          }
        })
        .catch(e => {
          state.errors.push(e)
        })
    }

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
  editTodo: (state, item) => {
    let clone = JSON.parse(JSON.stringify(item));
    state.editedTodo = clone;
  },
  updateEditedTodoName: (state, value) => {
    state.editedTodo.name = value;
  },
  updateEditedTodoDue: (state, value) => {
    state.editedTodo.due = value;
  },
  updateEditedTodoCompleted: (state, value) => {
    state.editedTodo.completed = value;
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
  editedTodo: (state) => state.editedTodo,
  todoList: (state) => state.list,
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})