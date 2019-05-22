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
                            <v-flex xs12 sm6 md12>
                                <v-select
                                        :items="contracts"
                                        v-model="contractsProjects.contracts"
                                        item-text="nameContracts"
                                        item-value="id"
                                        return-object
                                        label="Назва контракту"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md12>
                                <v-select
                                        :items="projects"
                                        v-model="contractsProjects.projects"
                                        item-text="nameProjects"
                                        item-value="id"
                                        return-object
                                        label="Назва проекту"
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
        name: "ContractsProjectsDialog",
        data() {
            return {
                dialog: false,
                contractsProjects: {

                },
                defaultCategory: {

                },
                contracts:[],
                projects: [],
            }
        },
        computed: {
            formTitle() {
                return this.contractsProjects.id ? "Редагування" : "Додавання";
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
                    this.contractsProjects = Object.assign({}, this.defaultCategory);
                }, 300)
            },
            save() {
                axios({
                    method: this.contractsProjects.id ? "PUT" : "POST",
                    url: "api/contracts_projects/" + (this.contractsProjects.id || ""),
                    data: this.contractsProjects,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((item) => {
                    this.close();
                    EventBus.$emit("call-snackbar", this.contractsProjects.id ? "Запис відредаговано" : "Запис додано");
                    EventBus.$emit((this.contractsProjects.id ? "edit" : "add") + "-item", item.data)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            EventBus.$on("item-edit-dialog", (item) => {
                this.contractsProjects = Object.assign({}, item);
                this.dialog = true;
            });

            axios.get('api/contracts')
                .then(response => this.contracts = response.data)
                .catch(err => console.log(err));

            axios.get('api/projects')
                .then(response => this.projects = response.data)
                .catch(err => console.log(err));

        }
    }
</script>