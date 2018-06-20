<template>
    <div class="box">
        <div class="field">
            <label class="label">Title</label>
            <div class="control">
                <input class="input" type="text" placeholder="Input title" v-model="title" required="true">
            </div>
        </div>

        <div class="field">
            <label class="label">Responsible for</label>
            <div class="control">
                <div class="select is-fullwidth">
                    <select v-model="responsible">
                        <option disabled>Select user</option>
                        <option v-for="user in users" :key="user.id" :value="user">{{user.username}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <label class="label">Due</label>
            <div class="field-body">
                <input class="input" type="date" v-model="due.date">
                <input class="input" type="time" v-model="due.time">
            </div>
        </div>
        <div class="field">
            <label class="label">Tags</label>
            <div class="box">
                <input type="search" list="tagsList" placeholder="Inform tag" v-model="tag" @keyup.enter="saveTag"/>
                <span class="tag is-info" v-for="(tag, index) in tags" :key="index" style="margin:4px;">
                    {{tag}}
                    &nbsp;
                    <span @click="removeTag({tag})">
                    <i class="far fa-times-circle"/>
                    </span>
                </span>
                
            </div>
            <datalist id="tagsList">
                <option v-for="(tag, index) in availableTags" :key="index" :value="tag"/>
            </datalist>
        </div>
         <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <textarea class="textarea" placeholder="Inform details of the task" v-model="description" ></textarea>
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
import dateHandler from "../../utils/date-handler";
export default {
  name: "TaskForm",
  data() {
    return {
      title: "",
      responsible: "",
      description: "",
      due: {
        date: "",
        time: "12:00"
      },
      tag: "",
      tags: []
    };
  },
  mounted() {
    this.due = dateHandler.getCurrentDateTime();
    this.$store.dispatch("loadTasks");
    this.$store.dispatch("loadUsers");
    this.$store.dispatch("loadTags");
  },
  methods: {
    save() {
      let task = {
        title: this.title,
        responsible: this.responsible,
        description: this.description,
        due: this.due
      };
      this.$store.dispatch("saveTask", task);
    },
    saveTag() {
      let exists = this.tags.filter((v) => v.toLowerCase() == this.tag.toLowerCase()).length > 0
        
      if (!exists && this.tag.trim().length > 0) {
        this.tags = [...this.tags, this.tag];
      }

      this.tag = "";
      
    },
    removeTag(tag) {
      let index = this.tags.findIndex(element => {
        return tag.tag == element;
      });
      this.tags.splice(index, 1);
    }
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    tasks() {
      return this.$store.getters.tasks;
    },
    availableTags() {
      let persistedTags = this.$store.getters.tags;
      let availableTags = persistedTags.filter(tag => {
        for (let current in this.tags) {
          if (this.tags[current] == tag) {
            return false;
          }
        }

        return true;
      });
      return availableTags;
    }
  }
};
</script>
<style scoped>
</style>
