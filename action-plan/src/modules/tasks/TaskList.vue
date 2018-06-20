<template>
    <div class="section">
        <div class="box">
            <div class="field has-addons">
                <div class="control">
                    <input class="input" type="search" placeholder="Find task" v-model="query">
                </div>
                <div class="control">
                    <a class="button is-info" @click="search">
                        Search
                    </a>
                </div>
                <div class="has-icons-right">
                    <a class="button is-primary" @click="showFormModal">
                        <span>Add an Task</span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-plus is-size-5"></i>
                        </span>
                    </a>
                </div>
                <modal-form title="Add a task: Please, inform task's data" :show="showModalForm" @close="closedModalForm">
                    <template slot="form">
                        <task-form @onCloseModal="closedModalForm"/>
                    </template>
                </modal-form>
            </div>
        </div>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    Task's list result
                </p>
                
            </header>
            <div class="card-content">
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th class="is-info">ID</th>
                            <th class="is-info">Title</th>
                            <th class="is-info">Responsible</th>
                            <th class="is-info">Due</th>
                            <th class="is-info">Description</th>
                            <th class="is-info">Status</th>
                            <th class="is-info">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="(task, index) in tasks" :key="index">
                            <td>
                                {{task.id}}
                            </td>
                            <td>
                                {{task.title}}
                            </td>
                            <td>
                                <span :title="task.responsible.name">{{task.responsible.username}}</span>
                            </td>
                            <td>
                                {{(task.due.date + " " + task.due.time)| convertDate}} {{task.due.time}}
                            </td>
                            <td>
                                {{task.description}}
                            </td>
                            <td>
                                {{task.status.name}}
                            </td>
                            <td><a class="delete" @click="showConfirmDeleteModal(task)"/></td>
                        </tr>
                    </tbody>
                    <tfoot> 
                    
                    </tfoot>
                </table>
            </div>
            <confirm-cancel-modal title="Confirm task's deletion?" :body="confirmDeleteModalBody" :show="showDeleteTaskModal" @confirm="confirmedTaskDeletion" @cancel="cancelledTaskDeletion" @close="closedConfirmDeleteModal"/>
        </div>
    </div>
</template>

<script>
import TaskForm from "./TaskForm.vue";
import ModalForm from "../../components/ModalForm.vue";
import ConfirmCancelModal from "../../components/ConfirmCancelModal.vue";

export default {
  name: "TaskList",
  components: {
    "task-form": TaskForm,
    "modal-form": ModalForm,
    "confirm-cancel-modal": ConfirmCancelModal
  },
  data() {
    return {
      showModalForm: false,
      showDeleteTaskModal: false,
      query: "",
      confirmDeleteModalBody: "",
      selectedTaskForDeletion: null
    };
  },
  mounted() {
    this.$store.dispatch("loadTasks");
  },
  methods: {
    showFormModal() {
      this.showModalForm = true;
    },
    showConfirmDeleteModal(task) {
      let msg = `<div><span class="has-text-info has-text-weight-bold">ID: </span>${
        task.id
      }</div><div><span class="has-text-info has-text-weight-bold">Name:  </span>${
        task.name
      }</div>`;
      this.confirmDeleteModalBody = msg;
      this.selectedTaskForDeletion = task;
      this.showDeleteTaskModal = true;
    },
    confirmedTaskDeletion() {
      this.$store.dispatch("deleteTaskById", this.selectedTaskForDeletion.id);
      this.closedConfirmDeleteModal();
    },
    closedModalForm() {
      this.showModalForm = false;
    },
    closedConfirmDeleteModal() {
      this.showDeleteTaskModal = false;
    },
    cancelledTaskDeletion() {
      this.closedConfirmDeleteModal();
    },
    search() {
      this.$store.dispatch("searchTask", this.query.trim());
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    }
  },
  filters: {
      convertDate(datetime) {
          console.log(datetime)
          return new Date(datetime).toLocaleDateString()
      }
  }
};
</script>
<style scoped>
</style>