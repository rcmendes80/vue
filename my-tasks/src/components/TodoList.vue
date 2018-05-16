<template>
  <div>
    <div class="columns has-background-warning has-text-weight-bold">
      <div class="column">No</div>
      <div class="column">ID</div>
      <div class="column">Name</div>
      <div class="column">Due</div>
      <div class="column">Completed</div>
    </div>
    <todo-item v-for="(item, index) in items" :key="index" :item="item" :index="index"/>
    <div class="columns">
      <div class="column">Total of Todos:</div>
      <div class="column">{{$store.state.list.length}}</div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  name: "TodoList",
  // props: ["items"],
  components: {
    "todo-item": TodoItem
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {
    items() {
      return this.$store.state.list;
    }
  }
};
</script>

<style>

</style>
