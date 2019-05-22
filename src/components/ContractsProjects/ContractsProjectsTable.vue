<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="contractsProjects"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.contracts.nameContracts }}</td>
            <td>{{props.item.projects.nameProjects}}</td>
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
        name: "ContractsProjectsTable",
        data() {
            return {
                headers: [
                    {text: 'Назва контратку', value: 'category', sortable: false},
                    {text: 'Назва проекту', value: 'category', sortable: false},
                ],
                contractsProjects: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteItem(item) {
                axios.delete("api/contracts_projects/" + item.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        let index = this.contractsProjects.findIndex(x => x.id === item.id);
                        this.contractsProjects.splice(index, 1);
                    });
            },
            edit(item) {
                EventBus.$emit("item-edit-dialog", item)
            }
        },
        mounted() {
            axios.get("api/contracts_projects")
                .then(res => {
                    this.contractsProjects = res.data;
                    this.contractsProjects.sort((a, b) => a.contracts > b.contracts ? 1 : -1)
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);
            EventBus.$on("edit-item", (item) => {
                let index = this.contractsProjects.findIndex(x => x.id === item.id);
                this.contractsProjects.splice(index, 1, item);
            });
            EventBus.$on("add-item", (item) => {
                this.contractsProjects.unshift(item);
            });
        }
    }
</script>