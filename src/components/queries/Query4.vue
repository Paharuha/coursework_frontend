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
                    <span class="headline">Запит №4</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="project"
                                        v-model="currentProject"
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
                <td>{{ props.item.dateStart }}</td>
                <td>{{ props.item.dateEnd }}</td>
                <td>{{ props.item.projects.nameProjects }}</td>
                <td>{{ props.item.value }}</td>
                <td>{{ props.item.division.nameDivision }}</td>
                <td>{{ props.item.subcontracting.name }}</td>
                <td>{{props.item.groupPeople.nameGroup}}</td>
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
        name: "Query4",
        components: {UniversalTable},
        data() {
            return {
                /*props for table*/
                items: [],
                headers: [
                    {text: 'Назва контратку', value: 'nameContracts', sortable: false},
                    {text: 'Дата початку', value: 'dateStart', sortable: false},
                    {text: 'Дата закінчення', value: 'dateEnd', sortable: false},
                    {text: 'Назва проекту', value: 'nameProject', sortable: false},
                    {text: 'Вартість', value: 'value', sortable: false},
                    {text: 'Назва відділу', value: 'division', sortable: false},
                    {text: 'Робоче обладнання', value: 'subcontracting', sortable: false},
                    {text: 'Матеріали', value: 'groupPeople', sortable: false},
                ],
                loading: false,
                /*props for dialog and others*/
                apiLink: '',
                loadAll: false,
                dialog: true,

                /*select*/
                project: [],
                currentProject: {},
            }
        },
        methods: {
            closeForm() {
                this.dialog = false;
            },
            search() {
                axios.get(`/api/contracts/find-by-namecontract`, {
                    params: {
                        name_contract: this.currentProject.nameProjects
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
            axios.get(`/api/projects`)
                .then(res => this.project = res.data);
        }
    }
</script>

<style scoped>
    .btn {
        z-index: 9999;
    }
</style>