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
                    <span class="headline">Запит №10</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="projects"
                                        v-model="currentSubcintracting"
                                        item-text="nameProjects"
                                        return-object
                                        label="Назва проекту"
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
                <td>{{ props.item.nameContracts }}</td>
               <td>{{ props.item.projects.nameProjects }}</td>
                <td>{{props.item.groupPeople.nameGroup}}</td>
                <td>{{props.item.groupPeople.designers.surname + ' ' + props.item.groupPeople.designers.name}}</td>
                <td>{{props.item.groupPeople.enginners.surname + ' ' + props.item.groupPeople.enginners.name}}</td>
                <td>{{props.item.groupPeople.technician.surname + ' ' + props.item.groupPeople.technician.name}}</td>
                <td>{{props.item.groupPeople.labAsistant.surname + ' ' + props.item.groupPeople.labAsistant.name}}</td>



            </template>
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:no-data>
            </template>
        </v-data-table>
<snackbar></snackbar>
    </div>
</template>

<script>
    import axios from 'axios';
    import {EventBus} from "../../event-bus";
    import UniversalTable from "../UniversalTable";
    import Snackbar from "../other/Snackbar";

    export default {
        name: "Query10",
        components: {Snackbar, UniversalTable},
        data() {
            return {
                /*props for table*/
                items: [],
                headers: [
                    {text: 'Назва контракту', value: 'nameProject', sortable: false},
                    {text: 'Назва проекту', value: 'groupPeople', sortable: false},
                    {text: 'Назва робочої групи', value: 'category', sortable: false},
                    {text: 'Прізвище дизайнера', value: 'category', sortable: false},
                    {text: 'Прізвище інженера', value: 'category', sortable: false},
                    {text: 'Прізвище техніка', value: 'category', sortable: false},
                    {text: 'Прізвище асистента', value: 'category', sortable: false},
                ],
                loading: false,
                /*props for dialog and others*/
                apiLink: '',
                loadAll: false,
                dialog: true,

                /*select*/
                projects: [],
                currentSubcintracting: {},
            }
        },
        methods: {
            closeForm() {
                this.dialog = false;
            },
            search() {
                axios.get(`/api/contracts/find-by-peopleproject`, {
                    params: {
                        'name': this.currentSubcintracting.nameProjects
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        this.items = response.data})
                EventBus.$emit('call-snackbar', `Кількість працівників: ${this.items.length * 4}`)
                    .finally(() => {
                        this.closeForm();
                        this.loading = false
                    });
            }
        },
        mounted() {
            axios.get(`/api/projects`)
                .then(res => this.projects = res.data);
        }
    }
</script>

<style scoped>
    .btn {
        z-index: 9999;
    }
</style>