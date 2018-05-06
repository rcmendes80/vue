<template>
  <div id="app">
    <h1>Todo List</h1>
    <todo-add-form/>
    <todo-list/>
  </div>
</template>

<script>
import TodoList from "./components/TodoList";
import TodoAddForm from "./components/TodoAddForm";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    "todo-list": TodoList,
    "todo-add-form": TodoAddForm
  },
  mounted() {
    this.$store.commit("loadTodoList");
  },
  data() {
    return {};
  },
  computed: {
    items() {
      return this.$store.state.list;
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
