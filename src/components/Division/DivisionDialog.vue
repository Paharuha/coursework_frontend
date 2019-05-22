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
                            <v-text-field v-model="division.nameDivision" label="Назва відділу"></v-text-field>
                            <v-flex xs12 sm6 md12>
                                <v-select
                                        :items="headDepartment"
                                        v-model="division.headDepartment"
                                        item-text="names"
                                        item-value="id"
                                        return-object
                                        label="Керівник"
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
        name: "DivisionDialog",
        data() {
            return {
                dialog: false,
                division: {

                },
                default: {

                },
                headDepartment:[],
            }
        },
        computed: {
            formTitle() {
                return this.division.id ? "Редагування" : "Додавання";
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
                    this.division = Object.assign({}, this.default);
                }, 300)
            },
            save() {
                axios({
                    method: this.division.id ? "PUT" : "POST",
                    url: "api/division/" + (this.division.id || ""),
                    data: this.division,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((item) => {
                    this.close();
                    EventBus.$emit("call-snackbar", this.division.id ? "Запис відредаговано" : "Запис додано");
                    EventBus.$emit((this.division.id ? "edit" : "add") + "-item", item.data)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            EventBus.$on("item-edit-dialog", (item) => {
                this.division = Object.assign({}, item);
                this.dialog = true;
            });

            axios.get('api/head_department')
                .then(response =>{
                    this.headDepartment = response.data;
                    this.headDepartment.forEach(item => item.names = `${item.surname} ${item.name}`)
                })
                .catch(err => console.log(err));


        }
    }
</script>