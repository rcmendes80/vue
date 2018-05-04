<template>
    <div class="add-form">
      <label>Title</label>
      <input/>
      <label>Due</label>
      <input/>
      <label>Is Completed</label>
      <input type="checkbox"/>
      <button>Add</button>
    </div>
</template>

<script>

export default {
  name: "TodoAddForm",
  components: {
  },
  data() {
    return {};
  },
  methods: {
    updateCompletedTodoItemState(id, isChecked) {
      this.$emit("update-todo", id, isChecked);
    }
  }
};
</script>

<style scoped>
.add-form {
  display: inline;
}
</style>
