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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <todo-item v-for="(item, index) in items" :key="index" :item="item" :index="index"  @delete="showConfirmDeleteModal" />
        </tbody>
       <tfoot> 
          
        </tfoot>
      </table>
    </div>
    <div>
      <em>Total of Todos: {{$store.state.list.length}}</em>
    </div>
    <confirm-cancel-modal :title="modalTitle" :body="modalBody" :show="showDeleteTodoModal" @confirm="confirmed" @cancel="cancelled" @close="closed"/>
  </section>
</template>

<script>
import TodoItem from "./TodoItem";
import ConfirmCancelModal from "./ConfirmCancelModal";

const DEFAULT_DELETE_MODAL_TITLE = "Confirm Todo deletion?";

export default {
  name: "TodoList",
  // props: ["items"],
  components: {
    "todo-item": TodoItem,
    "confirm-cancel-modal": ConfirmCancelModal
  },
  data() {
    return {
      showDeleteTodoModal: false,
      modalBody: "Testing Body",
      modalTitle: DEFAULT_DELETE_MODAL_TITLE,
      modalDeleteFunction: () => {}
    };
  },
  mounted() {},
  methods: {
    showConfirmDeleteModal({ id, name, deleteFn }) {
      let msg = `<div><span class="has-text-info has-text-weight-bold">ID: </span>${id}</div><div><span class="has-text-info has-text-weight-bold">Name:  </span>${name}</div>`;
      this.modalBody = msg;
      this.modalDeleteFunction = deleteFn;
      this.showDeleteTodoModal = true;
    },
    confirmed() {
      this.modalDeleteFunction();
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

<style scoped>
</style>
