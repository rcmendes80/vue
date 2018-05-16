<template>
  <section id="app" class="hero">
    <div class="hero-body">
      <div class="container">
      <h1 class="title has-background-primary has-text-white">
        Todo List
      </h1>
      <p class="subtitle">
        <em>{{this.$store.state.errors}}</em>
      </p>
      <todo-add-form/>
      <br/>
      <todo-list/>
      </div>
    </div>
  </section>
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
