<template>
  <div id="app">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Action Plan Manager
          </h1>
          <h2 class="subtitle">
            A Simple way to manage tasks of your team! ;)
          </h2>
        </div>
        <div class="notification is-size-7 has-text-black">
          <div>Users List</div>
          <ul>
            <li v-for="(user, index) in users" :key="index">
              <span style="font-weight:bold">ID: </span>{{user.id}}, 
              <span style="font-weight:bold">Name: </span>{{user.name}}, 
              <span style="font-weight:bold">Username: </span>{{user.username}}, 
              <span style="font-weight:bold">Email: </span>{{user.email}}, 
              <span style="font-weight:bold">Contact: </span>{{user.contact}}</li>
          </ul>
        </div>
         <div class="notification is-size-7 has-text-black">
          <div>Tasks List</div>
          <ul>
            <li v-for="(task, index) in tasks" :key="index">
              <span style="font-weight:bold">ID: </span>{{task.id}}, 
              <span style="font-weight:bold">Title: </span>{{task.title}}, 
              <span style="font-weight:bold">Responsible: </span>{{task.responsible.name}}, 
              <span style="font-weight:bold">Description: </span>{{task.description}}, 
              <span style="font-weight:bold">Due: </span>{{task.due.date}} | {{task.due.time}},
              <span style="font-weight:bold">Status: </span>{{task.status.name}}</li>

          </ul>
        </div>
      </div>
    </section>
    <user-form></user-form>
    <task-form></task-form>
  </div>
</template>

<script>
import UserForm from './modules/users/UserForm.vue'
import TaskForm from './modules/tasks/TaskForm.vue'
export default {
  name: "app",
  components: {
    'user-form': UserForm,
    'task-form': TaskForm,
  },
  data() {
    return {
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    tasks() {
      return this.$store.getters.tasks
    }
  }
}
</script>

<style scoped>

</style>
