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
    let clone = JSON.parse(todoAsJSON);
    clone.due = new Date(clone.due);
    todoAsJSON = JSON.stringify(clone);

    if (todo.id == null || todo.id <= 0) {

      HTTP.post(`todos`, todoAsJSON)
        .then(response => {
          if (response.status == 201) {
            state.list = [...state.list, response.data];
            state.editedTodo = {}
            state.editedTodo.due = this.getCurrentDateTime();
          }
        })
        .catch(e => {
          state.errors.push(e)
        })
    } else {
      HTTP.put("todos/" + todo.id, todoAsJSON)
        .then(response => {
          let status = response.status;
          if (status == "200" || status == "204") {
            let index = state.list.findIndex((element) => {
              return element.id == todo.id
            });
            state.list[index].completed = todo.completed;
            state.list[index].name = todo.name;
            state.list[index].due = todo.due;

          }
        })
        .catch(e => {
          state.errors.push(e)
        })
    }

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


// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
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