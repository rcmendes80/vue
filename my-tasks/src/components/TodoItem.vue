<template>
<tr>
  <td>{{index + 1}}</td>
  <td>{{item.id}}</td>
  <td>{{item.name}}</td>
  <td>{{item.due | formatDatetime}}</td>
  <td>
    <input
        type="checkbox"
        v-model="isChecked"
        @change="toggleCheckedState"
    />
  </td>
  <td>  
    <a class="button is-warning is-outlined" @click="editTodo">
      <span>Edit</span>
      <span class="icon is-small">
        <i class="fas fa-edit"></i>
      </span>
    </a>
    <a class="button is-danger is-outlined" @click="deleteTodo">
      <span>Delete</span>
      <span class="icon is-small">
        <i class="fas fa-times"></i>
      </span>
    </a>
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
      let fnDelete = () => {
        this.$store.commit("deleteTodo", this.item.id);
      };
      this.$emit("delete", {
        id: this.item.id,
        name: this.item.name,
        deleteFn: fnDelete
      });
    },
    editTodo() {
      // let fnUpdate = () => {
      //   this.$store.commit("updateTodo", this.item);
      // };
      // this.$emit("edit", {
      //   todo: this.item,
      //   updateFn: fnUpdate
      // });
      this.$store.commit("updateTodo", this.item);
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
