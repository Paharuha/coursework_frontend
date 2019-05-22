<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="division"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.nameDivision}}</td>
            <td>{{props.item.headDepartment.surname + ' ' + props.item.headDepartment.name }}</td>
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
        name: "DivisionTable",
        data() {
            return {
                headers: [
                    {text: 'Назва відділу', value: 'category', sortable: false},
                    {text: 'Керівник', value: 'category', sortable: false},
                ],
                division: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteItem(item) {
                axios.delete("api/division/" + item.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        let index = this.division.findIndex(x => x.id === item.id);
                        this.division.splice(index, 1);
                    });
            },
            edit(item) {
                EventBus.$emit("item-edit-dialog", item)
            }
        },
        mounted() {
            axios.get("api/division")
                .then(res => {
                    this.division = res.data;
                    this.division.sort((a, b) => a.nameDivision > b.nameDivision ? 1 : -1);
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);
            EventBus.$on("edit-item", (item) => {
                let index = this.division.findIndex(x => x.id === item.id);
                this.division.splice(index, 1, item);
            });
            EventBus.$on("add-item", (item) => {
                this.division.unshift(item);
            });
        }
    }
</script>