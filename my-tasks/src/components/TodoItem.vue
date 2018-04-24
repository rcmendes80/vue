<template>
  <tr>
    <td>{{item.name}}</td>
        <td>{{item.due}}</td>
        <td>
          <input
            type="checkbox"
            v-model="isChecked"
            @change="toggleCheckedState"
          />
          Completed: {{item.completed}}
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
    toggleCheckedState () {
      this.$emit("completedCheckHandler", this.index, this.isChecked);
    }
  }
};
</script>

<style>

</style>
