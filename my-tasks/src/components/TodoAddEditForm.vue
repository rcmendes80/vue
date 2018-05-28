<template>
  <div class="box">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" :value="editedTodo.name" @input="updateName" placeholder="Inform Todo name here." />
      </div>
    </div>
    <div class="field">
      <label class="label">Due</label>
      <div class="control">
        <!--
        <input class="input" :value="editedTodoDue" @input="updateDue" type="date" />
        <input class="input" :value="editedTodoDue" @input="updateDue" type="time" />
        -->
        <input class="input" :value="editedTodoDue" @input="updateDue" type="datetime-local" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" :checked="editedTodo.completed" @input="updateCompleted" /> Is Completed
        </label>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button @click="saveTodo" class="button is-primary is-outlined">Save</button>
      </div>
      <div class="control">
        <button class="button">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoAddForm",
  components: {},
  data() {
    return {};
  },
  methods: {
    saveTodo() {
      this.$store.commit("saveTodo");
    },
    updateName(e) {
      this.$store.commit("updateEditedTodoName", e.target.value);
    },
    updateDue(e) {
      this.$store.commit("updateEditedTodoDue", e.target.value);
    },
    updateCompleted(e) {
      this.$store.commit("updateEditedTodoCompleted", e.target.checked);
    }
  },
  computed: {
    editedTodo() {
      return this.$store.getters.editedTodo;
    },
    editedTodoDue() {
      let today = this.$store.getters.editedTodo.due; // + "";
      let parsedDatetime = today; //.slice(0, 16);
      return parsedDatetime;
    }
  }
};
</script>

<style scoped>
</style>