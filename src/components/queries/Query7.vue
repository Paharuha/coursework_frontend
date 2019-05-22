<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-dialog v-model="dialog" max-width="600" persistent>
            <template v-slot:activator="{ on }">
                <v-btn outline dark color="indigo" v-on="on" fixed top right class="btn">
                    Новий запит
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Запит №7</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="contracts"
                                        v-model="currentContracts"
                                        item-text="nameContracts"
                                        return-object
                                        label="Назва контракту"
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="closeForm">Відмінити</v-btn>
                    <v-btn color="blue darken-1" flat @click="search">Пошук</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-data-table
                :headers="headers"
                :items="items"
                :loading="loading"
                class="elevation-10"
        >
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:items="props">
                <td>{{ props.item.nameEquiment }}</td>
                <td>{{ props.item.number }}</td>
            </template>
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:no-data>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import UniversalTable from "../UniversalTable";

    export default {
        name: "Query7",
        components: {UniversalTable},
        data() {
            return {
                /*props for table*/
                items: [],
                headers: [
                    {text: 'Назва обладнання', value: 'category', sortable: false},
                    {text: 'Серійний номер', value: 'category', sortable: false},
                ],
                loading: false,
                /*props for dialog and others*/
                apiLink: '',
                loadAll: false,
                dialog: true,

                /*select*/
                contracts: [],
                currentContracts: {},
            }
        },
        methods: {
            closeForm() {
                this.dialog = false;
            },
            search() {
                axios.get(`/api/equiment/find-by-equiment-name`, {
                    params: {
                        name: this.currentContracts.nameContracts
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        this.items = response.data})
                    .finally(() => {
                        this.closeForm();
                        this.loading = false
                    });
            }
        },
        mounted() {
            axios.get(`/api/contracts`)
                .then(res => this.contracts = res.data);
        }
    }
</script>

<style scoped>
    .btn {
        z-index: 9999;
    }
</style>