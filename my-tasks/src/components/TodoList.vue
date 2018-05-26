<template>
  <section class="section">
    <div class="box">
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
      <button @click="showConfirmDeleteModal">show</button>
    </div>
    <confirm-cancel-modal title="Confirm Todo deletion?" body="Testing Body" :show="showDeleteTodoModal" @confirm="confirmed" @cancel="cancelled" @close="closed"/>
  </section>
</template>

<script>
import TodoItem from "./TodoItem";
import ConfirmCancelModal from "./ConfirmCancelModal";

export default {
  name: "TodoList",
  // props: ["items"],
  components: {
    "todo-item": TodoItem,
    "confirm-cancel-modal": ConfirmCancelModal
  },
  data() {
    return {
      showDeleteTodoModal: false
    };
  },
  mounted() {},
  methods: {
    showConfirmDeleteModal() {
      this.showDeleteTodoModal = true;
    },
    confirmed() {
      console.log("[", new Date().toJSON(), "] Confirm event captured!");
      this.closed();
    },
    closed() {
      this.showDeleteTodoModal = false;
    },
    cancelled() {
      this.closed();
    }
  },
  computed: {
    items() {
      return this.$store.state.list;
    }
  }
};
</script>

<style>
</style>
