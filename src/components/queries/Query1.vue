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
                    <span class="headline">Запит №1</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="tables"
                                        v-model="currentTable"
                                        item-text="name"
                                        item-value="id"
                                        return-object
                                        label="Категорія працівників"
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
                <td>{{ props.item.surname}}</td>
                <td>{{props.item.name}}</td>
                <td>{{props.item.birthday}}</td>
                <td>{{props.item.division.nameDivision}}</td>
            </template>
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:no-data>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import UniversalTable from '../UniversalTable'

    export default {
        name: "Query1",
        components: {UniversalTable},
        data() {
            return {
                /*props for table*/
                items: [],
                headers: [
                    {text: 'Прізвище', value: 'category', sortable: false},
                    {text: 'Імя', value: 'category', sortable: false},
                    {text: 'Дата народження', value: 'category', sortable: false},
                    {text: 'Назва відділу', value: 'category', sortable: false},
                ],
                loading: false,
                /*props for dialog and others*/
                apiLink: '',
                loadAll: false,
                dialog: true,
                canChoose: false,
                /*objects for select*/
                tables: [
                    {name: 'Дизайнери', apiLink: 'designers'},
                    {name: 'Інженери', apiLink: 'enginners'},
                    {name: 'Асистенти', apiLink: 'lab_asistant'},
                    {name: 'Техніки', apiLink: 'technician'},
                    {name: 'Інший персонал', apiLink: 'personal'},
                ],
                /*save current select value*/
                currentTable: {},
            }
        },
        watch: {
            currentTable() {
                this.loadAll = !this.currentTable.apiLink;
            }
        },
        methods: {
            closeForm() {
                this.dialog = false;
            },
            search() {
                this.items = [];
                this.loading = true;
                if (this.loadAll) {
                    for (let table of this.tables) {
                        if (table.apiLink) {

                            axios.get(`/api/${table.apiLink}`)
                                .then(response => this.items.push(...response.data))
                                .finally(() => {
                                    this.closeForm();
                                    this.loading = false
                                });
                        }
                    }
                } else {
                    axios.get(`/api/${this.currentTable.apiLink}`)
                        .then(response => this.items = response.data)
                        .finally(() => {
                            this.closeForm();
                            this.loading = false
                        });
                }
            }
        }
    }
</script>

<style scoped>
    .btn {
        z-index: 999;
    }
</style>