<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="groupPeople"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.nameGroup }}</td>
            <td>{{props.item.designers.surname + ' ' + props.item.designers.name}}</td>
            <td>{{props.item.enginners.surname + ' ' + props.item.enginners.name}}</td>
            <td>{{props.item.technician.surname + ' ' + props.item.technician.name}}</td>
            <td>{{props.item.labAsistant.surname + ' ' + props.item.labAsistant.name}}</td>
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
        name: "GroupPeopleTable",
        data() {
            return {
                headers: [
                    {text: 'Назва робочої групи', value: 'category', sortable: false},
                    {text: 'Прізвище дизайнера', value: 'category', sortable: false},
                    {text: 'Прізвище інженера', value: 'category', sortable: false},
                    {text: 'Прізвище техніка', value: 'category', sortable: false},
                    {text: 'Прізвище асистента', value: 'category', sortable: false},
                ],
                groupPeople: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteItem(item) {
                axios.delete("api/group_people/" + item.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        let index = this.groupPeople.findIndex(x => x.id === item.id);
                        this.groupPeople.splice(index, 1);
                    });
            },
            edit(item) {
                EventBus.$emit("item-edit-dialog", item)
            }
        },
        mounted() {
            axios.get("api/group_people")
                .then(res => {
                    this.groupPeople = res.data;
                    this.groupPeople.sort((a, b) => a.nameGroup > b.nameGroup ? 1 : -1)
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);
            EventBus.$on("edit-item", (item) => {
                let index = this.groupPeople.findIndex(x => x.id === item.id);
                this.groupPeople.splice(index, 1, item);
            });
            EventBus.$on("add-item", (item) => {
                this.groupPeople.unshift(item);
            });
        }
    }
</script>