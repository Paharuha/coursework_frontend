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
                    <span class="headline">Запит №3</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex md6>
                                <v-menu
                                        min-width="240px"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        v-model="datePicker1"
                                >
                                    <v-text-field
                                            :value="startDate"
                                            slot="activator"
                                            label="Початкова дата"
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
                            <v-flex md6>
                                <v-menu
                                        min-width="240px"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        v-model="datePicker2"
                                >
                                    <v-text-field
                                            :value="endDate"
                                            slot="activator"
                                            label="Кінцева дата"
                                            prepend-icon="date_range"
                                    ></v-text-field>
                                    <v-date-picker
                                            v-model="endDate"
                                            no-title
                                            scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="datePicker2 = false">OK</v-btn>
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
        name: "Query3",
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
                /*fields for date*/
                startDate: '',
                endDate: '',
                datePicker1: false,
                datePicker2: false,
            }
        },
        methods: {
            closeForm() {
                this.dialog = false;
            },
            search() {
                axios.get(`/api/contracts/find-by-date`, {
                    params: {
                        "start_date": this.startDate,
                        "end_date": this.endDate
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
        }
    }
</script>

<style scoped>
    .btn {
        z-index: 9999;
    }
</style>