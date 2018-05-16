<template>
<div class="columns" @mouseover="highlight">
  <div class="column">{{index + 1}}</div>
  <div class="column">{{item.id}}</div>
  <div class="column">{{item.name}}</div>
  <div class="column">{{item.due | formatDatetime}}</div>
  <div class="column">
    <input
        type="checkbox"
        v-model="isChecked"
        @change="toggleCheckedState"
    />
    <button @click="deleteTodo">X</button></div>
</div>


</template>

<script>
export default {
  name: "TodoItem",
  props: ["item", "index"],
  data() {
    return {
      isChecked: this.item.completed
    };
  },
  methods: {
    toggleCheckedState() {
      this.$store.commit("updateTodoStatus", {
        todo: this.item,
        isChecked: this.isChecked
      });
    },
    deleteTodo() {
      this.$store.commit("deleteTodo", this.item.id);
    },
    highlight() {}
  },
  filters: {
    formatDatetime(value) {
      if (!value) return "";
      value = value.toString();
      return value.slice(0, 10) + " " + value.slice(11, 16);
    }
  }
};
</script>

<style>

</style>
