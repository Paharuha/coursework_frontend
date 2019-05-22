<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="equiment"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.nameEquiment }}</td>
            <td>{{ props.item.number }}</td>
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
        name: "EquimentTable",
        data() {
            return {
                headers: [
                    {text: 'Назва обладнання', value: 'category', sortable: false},
                    {text: 'Серійний номер', value: 'category', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false},
                ],
                equiment: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteItem(item) {
                axios.delete("api/equiment/" + item.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        let index = this.equiment.findIndex(x => x.id === item.id);
                        this.equiment.splice(index, 1);
                    });
            },
            edit(item) {
                EventBus.$emit("item-edit-dialog", item)
            }
        },
        mounted() {
            axios.get("api/equiment")
                .then(res => {
                    this.equiment = res.data;
                    this.equiment.sort((a, b) => a.nameEquiment > b.nameEquiment ? 1 : -1)
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);
            EventBus.$on("edit-item", (item) => {
                let index = this.equiment.findIndex(x => x.id === item.id);
                this.equiment.splice(index, 1, item);
            });
            EventBus.$on("add-item", (item) => {
                this.equiment.unshift(item);
            });
        }
    }
</script>