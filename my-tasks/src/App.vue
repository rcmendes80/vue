<template>
  <div  id="app">
    <section class="hero is-medium is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Todo List
          </h1>
          <h2 class="subtitle">
            A simple todo list
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">  
        <todo-add-edit-form/>
        <todo-list/>
      </div>
    </section>
  </div>    
</template>

<script>
import TodoList from "./components/TodoList";
import TodoAddEditForm from "./components/TodoAddEditForm";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    "todo-list": TodoList,
    "todo-add-edit-form": TodoAddEditForm
  },
  mounted() {
    this.$store.commit("loadTodoList");
  },
  data() {
    return {};
  },
  computed: {}
};
</script>

<style scoped>
</style>
