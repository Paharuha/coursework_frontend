<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="contracts"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.nameContracts }}</td>
            <td>{{ props.item.dateStart }}</td>
            <td>{{ props.item.dateEnd }}</td>
            <td>{{ props.item.projects.nameProjects }}</td>
            <td>{{ props.item.value }}</td>
            <td>{{ props.item.division.nameDivision }}</td>
            <td>{{ props.item.subcontracting.name }}</td>
            <td>{{props.item.groupPeople.nameGroup}}</td>
            <td class="justify-right layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="edit(props.item)"
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
        name: "ContractsTable",
        data() {
            return {
                headers: [
                    {text: 'Назва контратку', value: 'category', sortable: false},
                    {text: 'Дата початку', value: 'category', sortable: false},
                    {text: 'Дата закінчення', value: 'category', sortable: false},
                    {text: 'Назва проекту', value: 'category', sortable: false},
                    {text: 'Вартість', value: 'category', sortable: false},
                    {text: 'Назва відділу', value: 'category', sortable: false},
                    {text: 'Матеріали', value: 'category', sortable: false},
                    {text: 'Робоча група', value: 'category', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false},
                ],
                contracts: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteItem(item) {
                axios.delete("api/contracts/" + item.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        let index = this.contracts.findIndex(x => x.id === item.id);
                        this.contracts.splice(index, 1);
                    });
            },
            edit(item) {
                EventBus.$emit("item-edit-dialog", item)
            }
        },
        mounted() {
            axios.get("api/contracts")
                .then(res => {
                    this.contracts = res.data;
                    this.contracts.sort((a, b) => a.nameContracts > b.nameContracts ? 1 : -1)
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);
            EventBus.$on("edit-item", (item) => {
                let index = this.contracts.findIndex(x => x.id === item.id);
                this.contracts.splice(index, 1, item);
            });
            EventBus.$on("add-item", (item) => {
                this.contracts.unshift(item);
            });
        }
    }
</script>