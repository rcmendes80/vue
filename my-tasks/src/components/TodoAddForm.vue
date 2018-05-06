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
      this.$store.commit('addTodo', {name: this.title, due: this.due, completed : this.completed});
      this.clearForm();
    },
    clearForm() {
      this.title ="";
      this.due = this.getCurrentDateTime();
      this.completed = false;
    }
  }
};
</script>

<style scoped>
.add-form {
  display: inline;
}
</style>
