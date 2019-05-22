<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="subcontracting"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.value }}</td>
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
        name: "SubcontractingTable",
        data() {
            return {
                headers: [
                    {text: 'Назва матеріалів', value: 'category', sortable: false},
                    {text: 'Вартість', value: 'category', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false},
                ],
                subcontracting: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteItem(item) {
                axios.delete("api/subcontracting/" + item.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        let index = this.subcontracting.findIndex(x => x.id === item.id);
                        this.subcontracting.splice(index, 1);
                    });
            },
            edit(item) {
                EventBus.$emit("item-edit-dialog", item)
            }
        },
        mounted() {
            axios.get("api/subcontracting")
                .then(res => {
                    this.subcontracting = res.data;
                    this.subcontracting.sort((a, b) => a.nameSubcontracting > b.nameSubcontracting ? 1 : -1)
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);
            EventBus.$on("edit-item", (item) => {
                let index = this.subcontracting.findIndex(x => x.id === item.id);
                this.subcontracting.splice(index, 1, item);
            });
            EventBus.$on("add-item", (item) => {
                this.subcontracting.unshift(item);
            });
        }
    }
</script>