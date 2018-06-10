<template>
  <div :class="[modalClass, {'is-active':show}]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
        <button class="delete" aria-label="close" @click="performClose"></button>
      </header>
      <section class="modal-card-body">
        <slot name="form"></slot>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalForm",
  props: ["title", "show"],
  data() {
    return {
      modalClass: "modal"
    };
  },
  methods: {
    performOK() {
      this.$emit("confirm");
    },

    performCancel() {
      this.$emit("cancel");
    },
    performClose() {
      this.$emit("close");
    }
  }
};
</script>
<style scoped>
</style>