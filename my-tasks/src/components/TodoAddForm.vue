<template>
    <div class="box">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input class="input" v-model="title" placeholder="Inform Todo title here."/>
        </div>
      </div>
      <div class="field">
        <label class="label">Due</label>
        <div class="control">
          <input class="input" v-model="due" type="datetime-local"/>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox"  v-model="completed" />
            Is Completed
          </label>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button @click="addTodo" class="button is-primary is-outlined">Add</button>
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
    return {
      title: "",
      due: this.getCurrentDateTime(),
      completed: false
    };
  },
  methods: {
    getCurrentDateTime() {
      let today = new Date();
      let parsedDatetime = today.toISOString().slice(0, 16);

      return parsedDatetime;
    },
    addTodo() {
      let parsedDatetime = new Date(this.due).toISOString();
      console.log("Date-time: ", parsedDatetime);
      this.$store.commit("addTodo", {
        name: this.title,
        due: parsedDatetime,
        completed: this.completed
      });
      this.clearForm();
    },
    clearForm() {
      this.title = "";
      this.due = this.getCurrentDateTime();
      this.completed = false;
    }
  }
};
</script>

<style scoped>
</style>
