<template>
    <div class="add-form">
      <label>Title</label>
      <input v-model="title" placeholder="Inform Todo title here."/>
      <label>Due</label>
      <input  v-model="due" type="datetime-local"/>
      <label>Is Completed</label>
      <input  v-model="completed" type="checkbox"/>
      <button @click="addTodo">Add</button>
    </div>
</template>

<script>
import store from "./store";

export default {
  name: "TodoAddForm",
  components: {
  },
  data() {
    return {
      title :"",
      due: this.getCurrentDateTime(),
      completed : false,
    };
  },
  methods: {
    getCurrentDateTime() {
      var today = new Date();
      return today.toISOString().slice(0, 16);
    },
    addTodo() {
      store.addTodo({name: this.title, due: this.due, completed : this.completed});
    }
  }
};
</script>

<style scoped>
.add-form {
  display: inline;
}
</style>
