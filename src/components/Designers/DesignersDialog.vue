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
                            <v-text-field v-model="designers.surname" label="Прізвище"></v-text-field>
                            <v-text-field v-model="designers.name" label="Імя"></v-text-field>
                            <v-text-field v-model="designers.coutSertificate" label="Кількість сертифікатів"></v-text-field>
                            <v-text-field v-model="designers.birthday" label="Дата народження"></v-text-field>
                            <v-flex xs12 sm6 md12>
                                <v-select
                                        :items="division"
                                        v-model="designers.division"
                                        item-text="nameDivision"
                                        item-value="id"
                                        return-object
                                        label="Назва відділу"
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
        name: "DesignersDialog",
        data() {
            return {
                dialog: false,
                designers: {

                },
                defaultCategory: {

                },
                division:[],
            }
        },
        computed: {
            formTitle() {
                return this.designers.id ? "Редагування" : "Додавання";
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
                    this.designers = Object.assign({}, this.defaultCategory);
                }, 300)
            },
            save() {
                axios({
                    method: this.designers.id ? "PUT" : "POST",
                    url: "api/designers/" + (this.designers.id || ""),
                    data: this.designers,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((item) => {
                    this.close();
                    EventBus.$emit("call-snackbar", this.designers.id ? "Запис відредаговано" : "Запис додано");
                    EventBus.$emit((this.designers.id ? "edit" : "add") + "-item", item.data)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            EventBus.$on("item-edit-dialog", (item) => {
                this.designers = Object.assign({}, item);
                this.dialog = true;
            });

            axios.get('api/division')
                .then(response => this.division = response.data)
                .catch(err => console.log(err));


        }
    }
</script>