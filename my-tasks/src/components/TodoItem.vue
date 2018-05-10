<template>
  <tr>
    <td>{{item.id}}</td>
    <td>{{item.name}}</td>
    <td>{{item.due}}</td>
    <td>
      <input
        type="checkbox"
        v-model="isChecked"
        @change="toggleCheckedState"
      />
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
      console.log("[", this.index, "]:", this.isChecked);
      this.$store.commit("updateTodoStatus", {
        index: this.index,
        isChecked: this.isChecked
      });
    }
  }
};
</script>

<style>

</style>
