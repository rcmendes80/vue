<template>
  <section class="section">
    <div class="container">
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Due</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <todo-item v-for="(item, index) in items" :key="index" :item="item" :index="index"/>
        </tbody>
       <tfoot> 
          
        </tfoot>
      </table>
    </div>
    <div>
      <em>Total of Todos: {{$store.state.list.length}}</em>
    </div>
  </section>
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
