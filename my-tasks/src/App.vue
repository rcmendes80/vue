<template>
  <div id="app">
    <h1>Todo List</h1>
    <todo-list :items="items" @update-todo="updateCompletedTodoItemState"></todo-list>
  </div>
</template>

<script>
import TodoList from "./components/TodoList";
export default {
  name: "app",
  components: {
    "todo-list": TodoList
  },
  mounted() {
    fetch("http://localhost:9090/todos")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.items = data;
      });
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    updateCompletedTodoItemState(id, isChecked) {
      this.items[id].completed = isChecked;
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
