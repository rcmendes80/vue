<template>
    <div class="box">
        <div class="field">
            <label class="label">Name</label>
            <div class="control has-icons-right">
                <input class="input" :class="{'is-danger': showWarningIconName}" required 
                    type="text" placeholder="Input name" v-model="name" @blur="evaluateField('name', $event)">
                <span class="icon is-small is-right" v-show="showOkIconName" >
                    <i class="fas fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-show="showWarningIconName" >
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
            <p class="help is-danger">{{nameFieldInfo}}</p>
        </div>

        <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" :class="{'is-danger': showWarningIconUsername}" type="text" placeholder="Input username" 
                    required v-model="username" @blur="evaluateField('username', $event)">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right" v-show="showOkIconUsername" >
                    <i class="fas fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-show="showWarningIconUsername" >
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
            <p class="help is-danger">{{usernameFieldInfo}}</p>
            <p class="help is-success">This username is available</p>
        </div>

        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" :class="{'is-danger': showWarningIconEmail}" type="email" 
                    required placeholder="Input e-mail" v-model="email" @keyup="evaluateField('email', $event)">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right" v-show="showOkIconEmail" >
                    <i class="fas fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-show="showWarningIconEmail" >
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
            <p class="help is-danger">{{emailFieldInfo}}</p>
        </div>
        <div class="field">
            <div class="label">Contact phone number</div>
            <div class="control has-icons-left has-icons-right">
                <input class="input is-danger" type="tel" placeholder="+55 61 9 9999-9999" v-model="contact">
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
                <a class="button is-light" @click="cancel">
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
      name: "",
      username: "",
      email: "",
      contact: "",
      nameFieldInfo: "",
      usernameFieldInfo: "",
      emailFieldInfo: ""
    };
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  },
  methods: {
    cancel() {
      this.$emit("onCloseModal");
    },
    save() {
      if (name.trim().length < 1) {
        this.nameFieldInfo = "Field name is mandatory.";
        return;
      }

      let user = {
        name: this.name,
        username: this.username,
        email: this.email,
        contact: this.contact
      };
      this.$store.dispatch("saveUser", user);
      this.$emit("onCloseModal");
    },
    evaluateField(field, event) {
      let target = event.target;
      switch (field) {
        case "name":
          if (!target.checkValidity()) {
            this.nameFieldInfo = target.validationMessage;
          } else {
            this.nameFieldInfo = "";
          }
          break;
        case "username":
          if (!target.checkValidity()) {
            this.usernameFieldInfo = target.validationMessage;
          } else {
            this.usernameFieldInfo = "";
          }
          break;
        case "email":
          if (!target.checkValidity()) {
            this.emailFieldInfo = target.validationMessage;
          } else {
            this.emailFieldInfo = "";
          }
          break;
      }
    }
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    showWarningIconEmail() {
      return this.emailFieldInfo.trim().length > 0;
    },
    showOkIconEmail() {
      return (
        this.emailFieldInfo.trim().length < 1 && this.email.trim().length > 0
      );
    },
    showWarningIconName() {
      return this.nameFieldInfo.trim().length > 0;
    },
    showOkIconName() {
      return (
        this.nameFieldInfo.trim().length < 1 && this.name.trim().length > 0
      );
    },
    showWarningIconUsername() {
      return this.usernameFieldInfo.trim().length > 0;
    },
    showOkIconUsername() {
      return (
        this.usernameFieldInfo.trim().length < 1 &&
        this.username.trim().length > 0
      );
    }
  }
};
</script>
<style scoped>
</style>