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
import dateHandler from '../../utils/date-handler'
export default {
    name: "TaskForm",
    data() {
        return {
            title: '',
            responsible: '',
            description: '',
            due: {
                date: '',
                time: '12:00'
            }
        }
    },
    mounted() {
        this.due = dateHandler.getCurrentDateTime()
        this.$store.dispatch("loadTasks")
    },
    methods: {
        save() {
            let task = {
                title: this.title,
                responsible: this.responsible,
                description: this.description,
                due: this.due,
            }
            this.$store.dispatch('saveTask', task)
        }
    },
    computed: {
        users() {
            return this.$store.getters.users
        }
    }
}
</script>
<style scoped>
</style>
