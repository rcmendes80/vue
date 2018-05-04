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
        </td>
  </tr>
</template>

<script>
import store from "./store";

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
      store.setCompletedStatus(this.index, this.isChecked)
    }
  }
};
</script>

<style>

</style>
