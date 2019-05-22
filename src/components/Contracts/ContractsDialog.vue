<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ on }">
            <v-btn fab dark color="indigo" v-on="on" fixed right bottom>
                <v-icon dark>add</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{formTitle}}</span>
            </v-card-title>



            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="contracts.nameContracts" label="Назва контракту"></v-text-field>
                            <v-text-field v-model="contracts.dateStart" label="Дата початку"></v-text-field>
                            <v-text-field v-model="contracts.dateEnd" label="Дата закінчення"></v-text-field>
                            <v-flex xs12 sm6 md12>
                                <v-select
                                        :items="projects"
                                        v-model="contracts.projects"
                                        item-text="nameProjects"
                                        item-value="id"
                                        return-object
                                        label="Проект"
                                ></v-select>
                            </v-flex>
                            <v-text-field v-model="contracts.value" label="Вартість"></v-text-field>
                            <v-flex xs12 sm6 md12>
                                <v-select
                                        :items="division"
                                        v-model="contracts.division"
                                        item-text="nameDivision"
                                        item-value="id"
                                        return-object
                                        label="Назва відділу"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md12>
                                <v-select
                                        :items="subcontracting"
                                        v-model="contracts.subcontracting"
                                        item-text="name"
                                        item-value="id"
                                        return-object
                                        label="Матеріали"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md12>
                                <v-select
                                        :items="groupPeople"
                                        v-model="contracts.groupPeople"
                                        item-text="nameGroup"
                                        item-value="id"
                                        return-object
                                        label="Робоча група"
                                ></v-select>
                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Відмінити</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Зберегти</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
    import axios from 'axios';
    import {EventBus} from "@/event-bus";
    export default {
        name: "ContractsDialog",
        data() {
            return {
                dialog: false,
                contracts: {

                },
                defaultCategory: {

                },
                projects: [],
                division: [],
                subcontracting: [],
                groupPeople: [],
            }
        },
        computed: {
            formTitle() {
                return this.contracts.id ? "Редагування" : "Додавання";
            }
        },
        watch: {
            dialog(newValue) {
                if (!newValue) {
                    this.close();
                }
            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.contracts = Object.assign({}, this.defaultCategory);
                }, 300)
            },
            save() {
                axios({
                    method: this.contracts.id ? "PUT" : "POST",
                    url: "api/contracts/" + (this.contracts.id || ""),
                    data: this.contracts,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((item) => {
                    this.close();
                    EventBus.$emit("call-snackbar", this.contracts.id ? "Запис відредаговано" : "Запис додано");
                    EventBus.$emit((this.contracts.id ? "edit" : "add") + "-item", item.data)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            EventBus.$on("item-edit-dialog", (item) => {
                this.contracts = Object.assign({}, item);
                this.dialog = true;
            });

            axios.get('api/projects')
                .then(response => this.projects = response.data)
                .catch(err => console.log(err));

            axios.get('api/division')
                .then(response => this.division = response.data)
                .catch(err => console.log(err));

            axios.get('api/subcontracting')
                .then(response => this.subcontracting = response.data)
                .catch(err => console.log(err));

            axios.get('api/group_people')
                .then(response => this.groupPeople = response.data)
                .catch(err => console.log(err));

        }
    }
</script>