<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-card>
            <v-card-title>
                {{tableName}}
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Пошук"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    :loading="loading"
                    :pagination.sync="pagination"
                    :search="search"
                    class="elevation-10"
            >
                <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
                <template v-slot:items="props">
                    <td v-for="header in headers" v-show="header.value !== 'action'">
                        {{props.item[header.value]}}
                    </td>
                    <td class="justify-center layout px-0" v-show="!hiddenAction">
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem(props.item)"
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
        </v-card>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "UniversalTable",
        props: {
            apiLink: String,
            headers: Array,
            items: Array,
            tableName: String,
            loading: Boolean,
            hiddenAction: Boolean,
        },
        data() {
            return {
                pagination: {
                    rowsPerPage: 10
                },
                search: ''
            }
        },
        methods: {
            deleteItem(item) {
                axios.delete(`api/${this.apiLink}/` + item.id)
                    .then(() => {
                        this.$root.$emit("call-snackbar", "Запис видалено");
                        let index = this.items.findIndex(x => x.id === item.id);
                        this.items.splice(index, 1);
                    });
            },
            editItem(item) {
                this.$root.$emit("item-edit-dialog", item);
            }
        },
        mounted() {
            this.$root.$on("edit-item", (item) => {
                let index = this.items.findIndex(x => x.id === item.id);
                this.items.splice(index, 1, item);
            });
            this.$root.$on("add-item", (item) => {
                this.items.unshift(item);
            });
        }
    }
</script>