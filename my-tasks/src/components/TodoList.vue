<template>
  <div id="todo">
    <table>
        <todo-item v-for="(item, index) in items" :key="index" :item="item" @completedCheckHandler="updateCompletedTodoItemState" :index="index"/>
    </table>
  </div>
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
  methods: {
    updateCompletedTodoItemState(id, isChecked) {
      this.$emit("update-todo", id, isChecked);
    }
  }
};
</script>

<style>

</style>
