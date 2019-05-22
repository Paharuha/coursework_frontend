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
                    <span class="headline">Запит №8</span>
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
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :disabled="!canChoose"
                                        :items="products"
                                        v-model="currentProduct"
                                        item-text="surname"
                                        item-value="id"
                                        return-object
                                        label="Прізвище"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-menu
                                        min-width="240px"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        v-model="datePicker1"
                                >
                                    <v-text-field
                                            :value="startDate"
                                            slot="activator"
                                            label="Дата"
                                            prepend-icon="date_range"
                                    ></v-text-field>
                                    <v-date-picker
                                            v-model="startDate"
                                            no-title
                                            scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="datePicker1 = false">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
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
    import UniversalTable from "../UniversalTable";
    export default {
        name: "Query8",
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
                    {name: 'Дизайнери', apiLink: 'designers', queryLink: 'find-by-designers'},
                    {name: 'Інженери', apiLink: 'enginners', queryLink: 'find-by-enginners'},
                    {name: 'Асистенти', apiLink: 'lab_asistant', queryLink: 'find-by-lab_asistant'},
                    {name: 'Техніки', apiLink: 'technician', queryLink: 'find-by-technician'},
                    {name: 'Інший персонал', apiLink: 'personal', queryLink: 'find-by-personal'}
                    ],
                products: [],
                laboratories: [],
                /*save current select value*/
                currentTable: {},
                currentProduct: {},
                currentLaboratory: {},
                startDate: '',
                datePicker1: false
            }
        },
        watch: {
            currentTable() {
                this.loadAll = false;
                this.canChoose = this.currentTable.apiLink;
                if (this.currentTable.apiLink) {
                    axios.get(`/api/${this.currentTable.apiLink}`)
                        .then(response => this.products = response.data)
                        .catch(error => console.log(error));
                } else {
                    this.loadAll = true;
                }
            }
        },
        methods: {
            closeForm() {
                this.dialog = false;
            },
            search() {
                this.items = [];
                this.loading = true;
                axios.get(`/api/${this.currentTable.apiLink}/${this.currentTable.queryLink}`, {
                    params: {
                        "surname": this.currentProduct.surname,
                        "date1": this.startDate,
                    }
                })
                    .then(response => this.items = response.data)
                    .finally(() => {
                        this.closeForm();
                        this.loading = false
                    });
            }
        },

    }
</script>

<style scoped>
    .btn {
        z-index: 999;
    }
</style>