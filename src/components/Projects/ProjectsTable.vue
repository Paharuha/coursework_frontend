<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="projects"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.nameProjects}}</td>
            <td>{{ props.item.type}}</td>
            <td>{{props.item.equiment.nameEquiment}}</td>

            <td class="justify-right layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="edit(props. item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(props.item)"
                >
                    delete
                </v-icon>
            </td>
        </template>
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:no-data>
        </template>
    </v-data-table>
</template>

<script>
    import axios from 'axios';
    import {EventBus} from "@/event-bus";
    export default {
        name: "ProjectsTable",
        data() {
            return {
                headers: [
                    {text: 'Назва проекту', value: 'category', sortable: false},
                    {text: 'Тип', value: 'category', sortable: false},
                    {text: 'Обладнання', value: 'category', sortable: false},
                ],
                projects: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteItem(item) {
                axios.delete("api/projects/" + item.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        let index = this.projects.findIndex(x => x.id === item.id);
                        this.projects.splice(index, 1);
                    });
            },
            edit(item) {
                EventBus.$emit("item-edit-dialog", item)
            }
        },
        mounted() {
            axios.get("api/projects")
                .then(res => {
                    this.projects = res.data;
                    this.projects.sort((a, b) => a.surname > b.surname ? 1 : -1);
                    this.projects.sort((a, b) => a.name > b.name ? 1 : -1)
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);
            EventBus.$on("edit-item", (item) => {
                let index = this.projects.findIndex(x => x.id === item.id);
                this.projects.splice(index, 1, item);
            });
            EventBus.$on("add-item", (item) => {
                this.projects.unshift(item);
            });
        }
    }
</script>