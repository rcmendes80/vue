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
      </div>
    </section>
    <div class="tabs">
      <ul>
        <li @click="activate('home')" :class="{'is-active': isHomeMenuActive}">
          <router-link to="/">Home</router-link>
        </li>
        <li @click="activate('users')" :class="{'is-active': isUsersMenuActive}">
          <router-link to="/users">Users</router-link>
        </li>
        <li @click="activate('tasks')" :class="{'is-active': isTasksMenuActive}">
          <router-link to="/tasks">Tasks</router-link>
        </li>
      </ul>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      isHomeMenuActive: true,
      isUsersMenuActive: false,
      isTasksMenuActive: false
    };
  },
  methods: {
    activate(menu) {
      this.isUsersMenuActive = false;
      this.isTasksMenuActive = false;
      this.isHomeMenuActive = false;
      switch (menu) {
        case "users":
          this.isUsersMenuActive = true;
          break;
        case "tasks":
          this.isTasksMenuActive = true;
          break;
        case "home":
          this.isHomeMenuActive = true;
      }
    }
  }
};
</script>

<style scoped>
</style>