<template>
    <table>
        <todo-item v-for="(item, index) in items" :key="index" :item="item" :index="index"/>
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
    return {
    };
  },
  mounted() {
  },
  methods: {
  
  }
};
</script>

<style>

</style>
