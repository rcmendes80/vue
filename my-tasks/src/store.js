import Vue from 'vue'
import Vuex from 'vuex'
import {
  HTTP
} from './http-commons.js';
import axios from 'axios';
Vue.use(Vuex)


function getCurrentDateTime() {
  let today = new Date();
  let offset = today.getTimezoneOffset();
  today = new Date(today.getTime() - (offset * 60000))
  let parsedDatetime = today.toJSON().slice(0, 16);
  console.log(parsedDatetime)
  return parsedDatetime;
}

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  list: [],
  errors: [],
  editedTodo: {
    id: 0,
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
        state.list.forEach((element) => {
          element.due = new Date(element.due);
        });
      })
      .catch(e => {
        state.errors.push(e);
      });
  },
  saveTodo: (state) => {
    let todo = JSON.parse(JSON.stringify(state.editedTodo));
    todo.due = new Date(todo.due + ":00Z");

    let todoAsJSON = JSON.stringify(todo);

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
    state.editedTodo.id = item.id;
    state.editedTodo.name = item.name;
    state.editedTodo.due = item.due.toISOString().slice(0, 16);
    state.editedTodo.completed = item.completed;
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