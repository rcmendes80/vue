<template>
    <table>
      <thead>
        <th>Name</th>
        <th>Due</th>
        <th>Completed</th>
      </thead>
      <tbody>
        <todo-item v-for="(item, index) in items" :key="index" :item="item" :index="index"/>
      </tbody>
      <tfoot><td colspan="2">Total of Todos:</td><td>{{$store.state.list.length}}</td></tfoot>
    </table>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  name: "TodoList",
  props: ["items"],
  components: {
    "todo-item": TodoItem
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style>

</style>
