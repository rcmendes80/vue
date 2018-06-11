<template>
    <div class="box">
        <div class="field">
            <label class="label">Name</label>
            <div class="control has-icons-right">
                <input id="nameInput" class="input" :class="{'is-danger': showWarningIconName}" required 
                    type="text" placeholder="Input name" v-model="name" @keyup="evalNameInput">
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
                <input id="usernameInput" class="input" :class="{'is-danger': showWarningIconUsername}" type="text" placeholder="Input username" 
                    required v-model="username" @keyup="evalUsernameInput" @blur="checkUsername">
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
            <p class="help is-success" v-show="usernameAvailableInfo">This username is available</p>
        </div>

        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input id="emailInput" class="input" :class="{'is-danger': showWarningIconEmail}" type="email" 
                    required placeholder="Input e-mail" v-model="email" @keyup="evalEmailInput">
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
                <input id="contactInput" class="input" :class="{'is-danger': showWarningIconContact}" type="tel" placeholder="55 61 99999-9999"
                pattern="[0-9]{1,3} [0-9]{1,3} [0-9]{5}-[0-9]{4}" v-model="contact" @keyup="evalContactInput">
                <span class="icon is-small is-left">
                    <i class="fas fa-phone-square"></i>
                </span>
                <span class="icon is-small is-right" v-show="showOkIconContact" >
                    <i class="fas fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-show="showWarningIconContact" >
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
            <p class="help is-danger">{{contactFieldInfo}}</p>
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
      emailFieldInfo: "",
      contactFieldInfo: "",
      usernameAvailableInfo: false
    };
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  },
  methods: {
    initData() {
      this.name = "";
      this.username = "";
      this.email = "";
      this.contact = "";
      this.nameFieldInfo = "";
      this.usernameFieldInfo = "";
      this.emailFieldInfo = "";
      this.contactFieldInfo = "";
      this.usernameAvailableInfo = false;
    },
    cancel() {
      this.$emit("onCloseModal");
    },
    evalNameInput() {
      let nameInput = document.getElementById("nameInput");
      if (!nameInput.checkValidity()) {
        this.nameFieldInfo = nameInput.validationMessage;
      } else {
        this.nameFieldInfo = "";
      }
    },
    evalUsernameInput() {
      let usernameInput = document.getElementById("usernameInput");
      if (!usernameInput.checkValidity()) {
        this.usernameFieldInfo = usernameInput.validationMessage;
      } else {
        this.usernameFieldInfo = "";
      }
    },
    evalEmailInput() {
      let emailInput = document.getElementById("emailInput");
      if (!emailInput.checkValidity()) {
        this.emailFieldInfo = emailInput.validationMessage;
      } else {
        this.emailFieldInfo = "";
      }
    },
    evalContactInput() {
      let contactInput = document.getElementById("contactInput");
      if (!contactInput.checkValidity()) {
        this.contactFieldInfo = contactInput.validationMessage;
      } else {
        this.contactFieldInfo = "";
      }
    },
    save() {
      this.evalNameInput();
      this.evalUsernameInput();
      this.evalEmailInput();
      this.evalContactInput();
      if (
        //   this
        this.nameFieldInfo.trim().length > 0 ||
        this.usernameFieldInfo.trim().length > 0 ||
        this.emailFieldInfo.trim().length > 0 ||
        this.contactFieldInfo.trim().length > 0
      ) {
        return;
      }

      let user = {
        name: this.name,
        username: this.username,
        email: this.email,
        contact: this.contact
      };
      this.$store.dispatch("saveUser", user);
      this.initData();
      this.$emit("onCloseModal");
    },
    checkUsername() {
      this.usernameAvailableInfo = this.username.length > 5;
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
    },
    showWarningIconContact() {
      return this.contactFieldInfo.trim().length > 0;
    },
    showOkIconContact() {
      return (
        this.contactFieldInfo.trim().length < 1 &&
        this.contact.trim().length > 0
      );
    }
  }
};
</script>
<style scoped>
</style>