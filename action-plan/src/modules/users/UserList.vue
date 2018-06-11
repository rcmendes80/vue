<template>
    <div class="section">
        <div class="box">
            <div class="field has-addons">
                <div class="control">
                    <input class="input" type="search" placeholder="Find user" v-model="query">
                </div>
                <div class="control">
                    <a class="button is-info" @click="search">
                        Search
                    </a>
                </div>
                <div class="has-icons-right">
                    <a class="button is-primary" @click="showFormModal">
                        <span>Add a Task</span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-plus is-size-5"></i>
                        </span>
                    </a>
                </div>
                <modal-form title="Add a user: Please, inform user's data" :show="showModalForm" @close="closedModalForm">
                    <template slot="form">
                        <user-form @onCloseModal="closedModalForm"/>
                    </template>
                </modal-form>
            </div>
        </div>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    User's list result
                </p>
                
            </header>
            <div class="card-content">
                <div class="content">
                    <div class="columns">
                        <div class="column"><p class="bd-notification is-primary">ID</p></div>
                        <div class="column"><p class="bd-notification is-primary">Name</p></div>
                        <div class="column"><p class="bd-notification is-primary">Username</p></div>
                        <div class="column"><p class="bd-notification is-primary">Email</p></div>
                        <div class="column"><p class="bd-notification is-primary">Contact</p></div>
                        <div class="column">&nbsp;</div>
                    </div>
                </div>
                <div class="columns"  v-for="(user, index) in users" :key="index">
                    <div class="column">
                        {{user.id}}
                    </div>
                    <div class="column">
                        {{user.name}}
                    </div>
                    <div class="column">
                        {{user.username}}
                    </div>
                    <div class="column">
                        {{user.email}}
                    </div>
                    <div class="column">
                        {{user.contact}}
                    </div>
                    <div><a class="delete" @click="showConfirmDeleteModal(user)"/></div>
                </div>
            </div>
            <confirm-cancel-modal title="Confirm user's deletion?" :body="confirmDeleteModalBody" :show="showDeleteUserModal" @confirm="confirmedUserDeletion" @cancel="cancelledUserDeletion" @close="closedConfirmDeleteModal"/>
        </div>
    </div>
</template>

<script>
import UserForm from "./UserForm.vue";
import ModalForm from "../../components/ModalForm.vue";
import ConfirmCancelModal from "../../components/ConfirmCancelModal.vue";

export default {
  name: "UserList",
  components: {
    "user-form": UserForm,
    "modal-form": ModalForm,
    "confirm-cancel-modal": ConfirmCancelModal
  },
  data() {
    return {
      showModalForm: false,
      showDeleteUserModal: false,
      query: "",
      confirmDeleteModalBody: "",
      selectedUserForDeletion: null
    };
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  },
  methods: {
    showFormModal() {
      this.showModalForm = true;
    },
    showConfirmDeleteModal(user) {
      let msg = `<div><span class="has-text-info has-text-weight-bold">ID: </span>${
        user.id
      }</div><div><span class="has-text-info has-text-weight-bold">Name:  </span>${
        user.name
      }</div>`;
      this.confirmDeleteModalBody = msg;
      this.selectedUserForDeletion = user;
      this.showDeleteUserModal = true;
    },
    confirmedUserDeletion() {
      this.$store.dispatch("deleteUserById", this.selectedUserForDeletion.id);
      this.closedConfirmDeleteModal();
    },
    closedModalForm() {
      this.showModalForm = false;
    },
    closedConfirmDeleteModal() {
      this.showDeleteUserModal = false;
    },
    cancelledUserDeletion() {
      this.closedConfirmDeleteModal();
    },
    search() {
      this.$store.dispatch("searchUser", this.query.trim());
    }
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  }
};
</script>
<style scoped>
</style>