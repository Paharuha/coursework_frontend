<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="labAsistant"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.surname}}</td>
            <td>{{props.item.name}}</td>
            <td>{{ props.item.date}}</td>
            <td>{{props.item.birthday}}</td>
            <td>{{props.item.division.nameDivision}}</td>

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
        name: "LabAsistantTable",
        data() {
            return {
                headers: [
                    {text: 'Прізвище', value: 'category', sortable: false},
                    {text: 'Імя', value: 'category', sortable: false},
                    {text: 'Дата прийому', value: 'category', sortable: false},
                    {text: 'Дата народження', value: 'category', sortable: false},
                    {text: 'Назва відділу', value: 'category', sortable: false},
                ],
                labAsistant: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteItem(item) {
                axios.delete("api/lab_asistant/" + item.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        let index = this.labAsistant.findIndex(x => x.id === item.id);
                        this.labAsistant.splice(index, 1);
                    });
            },
            edit(item) {
                EventBus.$emit("item-edit-dialog", item)
            }
        },
        mounted() {
            axios.get("api/lab_asistant")
                .then(res => {
                    this.labAsistant = res.data;
                    this.labAsistant.sort((a, b) => a.surname > b.surname ? 1 : -1);
                    this.labAsistant.sort((a, b) => a.name > b.name ? 1 : -1)
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);
            EventBus.$on("edit-item", (item) => {
                let index = this.labAsistant.findIndex(x => x.id === item.id);
                this.labAsistant.splice(index, 1, item);
            });
            EventBus.$on("add-item", (item) => {
                this.labAsistant.unshift(item);
            });
        }
    }
</script>