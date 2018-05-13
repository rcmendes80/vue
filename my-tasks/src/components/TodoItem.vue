<template>
  <tr>
    <td>{{item.id}}</td>
    <td>{{item.name}}</td>
    <td>{{item.due | formatDatetime}}</td>
    <td>
      <input
        type="checkbox"
        v-model="isChecked"
        @change="toggleCheckedState"
      />
      <button @click="deleteTodo">X</button>
    </td>
  </tr>
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
    }
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
