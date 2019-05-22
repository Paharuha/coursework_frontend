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
                            <v-text-field v-model="projects.nameProjects" label="Назва проекту"></v-text-field>
                            <v-text-field v-model="projects.type" label="Тип проекту"></v-text-field>
                            <v-flex xs12 sm6 md12>
                                <v-select
                                        :items="equiment"
                                        v-model="projects.equiment"
                                        item-text="nameEquiment"
                                        item-value="id"
                                        return-object
                                        label="Обладнання"
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
        name: "ProjectsDialog",
        data() {
            return {
                dialog: false,
                projects: {

                },
                defaultCategory: {

                },
                equiment:[],
            }
        },
        computed: {
            formTitle() {
                return this.projects.id ? "Редагування" : "Додавання";
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
                    this.projects = Object.assign({}, this.defaultCategory);
                }, 300)
            },
            save() {
                axios({
                    method: this.projects.id ? "PUT" : "POST",
                    url: "api/projects/" + (this.projects.id || ""),
                    data: this.projects,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((item) => {
                    this.close();
                    EventBus.$emit("call-snackbar", this.projects.id ? "Запис відредаговано" : "Запис додано");
                    EventBus.$emit((this.projects.id ? "edit" : "add") + "-item", item.data)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            EventBus.$on("item-edit-dialog", (item) => {
                this.projects = Object.assign({}, item);
                this.dialog = true;
            });

            axios.get('api/equiment')
                .then(response => this.equiment = response.data)
                .catch(err => console.log(err));


        }
    }
</script>