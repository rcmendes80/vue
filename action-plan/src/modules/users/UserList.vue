<template>
    <div class="section">
        <div class="box">
            <div class="field has-addons">
                <div class="control">
                    <input class="input" type="search" placeholder="Find user">
                </div>
                <div class="control">
                    <a class="button is-info">
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
                <modal-form :title="modalTitle" :show="showModal" @confirm="confirmed" @cancel="cancelled" @close="closed">
                    <template slot="form">
                        <user-form @onCloseModal="closed"/>
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
                        <div class="column"></div>
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
                    <div><a class="delete"></a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserForm from "./UserForm.vue";
import ModalForm from "../../components/ModalForm.vue";

export default {
  name: "UserList",
  components: {
    "user-form": UserForm,
    "modal-form": ModalForm
  },
  data() {
    return {
      showModal: false,
      modalTitle: `Add a user: Please, inform user's data`,
      modalDeleteFunction: () => {}
    };
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  },
  methods: {
    showFormModal() {
      this.showModal = true;
    },
    showConfirmDeleteModal({ id, name, deleteFn }) {
      this.modalDeleteFunction = deleteFn;
      this.showModal = true;
    },
    confirmed() {
      this.modalDeleteFunction();
      this.closed();
    },
    closed() {
      this.showModal = false;
    },
    cancelled() {
      this.closed();
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