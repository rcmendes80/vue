<template>
    <div class="box">
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="Input name" v-model="name" required="true">
            </div>
        </div>

        <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input is-success" type="text" placeholder="Input username" required="true" v-model="username">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
            </div>
            <p class="help is-success">This username is available</p>
        </div>

        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input is-danger" type="email" placeholder="Input e-mail" required="true" v-model="email">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
            <p class="help is-danger">This email is invalid</p>
        </div>
        <div class="field">
            <div class="label">Contact phone number</div>
            <div class="control has-icons-left has-icons-right">
                <input class="input is-danger" type="tel" placeholder="+55 61 9 9999-9999" required="false" v-model="contact">
                <span class="icon is-small is-left">
                    <i class="fas fa-phone-square"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
        </div>
        <div class="field is-grouped is-grouped-right">
            <p class="control">
                <a class="button is-primary" @click="save">
                    Save
                </a>
            </p>
            <p class="control">
                <a class="button is-light">
                    Cancel
                </a>
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: "UserForm",
  data() {
      return {
          name : '',
          username:'',
          email: '',
          contact: ''
      }
  },
  mounted() {
      this.$store.dispatch('loadUsers')
  },
  methods : {
      save() {
          let user = {
            name : this.name,
            username : this.username,
            email : this.email,
            contact : this.contact,
          }
          this.$store.dispatch('saveUser', user)
      }
  }
}
</script>
<style scoped>
</style>
