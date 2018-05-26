<template>
  <div  id="app">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-size-2 ">
            Todo List
          </h1>
          <p class="subtitle">
            <em>{{this.$store.state.errors}}</em>
          </p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">  
        <todo-add-form/>
        <todo-list/>
      </div>
    </section>
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
</style>
