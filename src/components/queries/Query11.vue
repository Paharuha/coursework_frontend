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
                    <span class="headline">Запит №11</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="number"
                                        v-model="currentEquiment"
                                        item-text="number"
                                        return-object
                                        label="Номер устаткування"
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
                <td>{{ props.item.nameProjects}}</td>
                <td>{{ props.item.type}}</td>
                <td>{{props.item.equiment.nameEquiment}}</td>
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
        name: "Query11",
        components: {UniversalTable},
        data() {
            return {
                /*props for table*/
                items: [],
                headers: [
                    {text: 'Назва проекту', value: 'category', sortable: false},
                    {text: 'Тип', value: 'category', sortable: false},
                    {text: 'Обладнання', value: 'category', sortable: false},
                    {text: 'Назва обладнання', value: 'category', sortable: false},
                    {text: 'Серійний номер', value: 'category', sortable: false},
                ],
                loading: false,
                /*props for dialog and others*/
                apiLink: '',
                loadAll: false,
                dialog: true,

                /*select*/
                number: [],
                currentEquiment: {},
            }
        },
        methods: {
            closeForm() {
                this.dialog = false;
            },
            search() {
                console.log(this.currentEquiment.number);
                axios.get(`/api/projects/find-by-equimentnum`, {
                    params: {
                        number: parseInt(this.currentEquiment.number)
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
            axios.get(`/api/equiment`)
                .then(res => this.number = res.data);
        }
    }
</script>

<style scoped>
    .btn {
        z-index: 9999;
    }
</style>