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

                            <v-text-field v-model="groupPeople.nameGroup" label="Назва робочої групи"></v-text-field>
                            <v-flex xs12 sm6 md12>
                                <v-select
                                        :items="designers"
                                        v-model="groupPeople.designers"
                                        item-text="names"
                                        item-value="id"
                                        return-object
                                        label="Дизайнер"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md12>
                            <v-select
                                    :items="enginners"
                                    v-model="groupPeople.enginners"
                                    item-text="names"
                                    item-value="id"
                                    return-object
                                    label="Інженер"
                            ></v-select>
                        </v-flex>
                            <v-flex xs12 sm6 md12>
                                <v-select
                                        :items="technician"
                                        v-model="groupPeople.technician"
                                        item-text="names"
                                        item-value="id"
                                        return-object
                                        label="=Технік"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md12>
                                <v-select
                                        :items="labAsistant"
                                        v-model="groupPeople.labAsistant"
                                        item-text="names"
                                        item-value="id"
                                        return-object
                                        label="Асистента"
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
        name: "GroupPeopleDialog",
        data() {
            return {
                dialog: false,
                groupPeople: {

                },
                defaultCategory: {

                },
                designers:[],
                enginners: [],
                technician:[],
                labAsistant:[],
            }
        },
        computed: {
            formTitle() {
                return this.groupPeople.id ? "Редагування" : "Додавання";
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
                    this.groupPeople = Object.assign({}, this.defaultCategory);
                }, 300)
            },
            save() {
                axios({
                    method: this.groupPeople.id ? "PUT" : "POST",
                    url: "api/group_people/" + (this.groupPeople.id || ""),
                    data: this.groupPeople,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((item) => {
                    this.close();
                    EventBus.$emit("call-snackbar", this.groupPeople.id ? "Запис відредаговано" : "Запис додано");
                    EventBus.$emit((this.groupPeople.id ? "edit" : "add") + "-item", item.data)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            EventBus.$on("item-edit-dialog", (item) => {
                this.groupPeople = Object.assign({}, item);
                this.dialog = true;
            });

            axios.get('api/designers').then(response =>{
                this.designers = response.data;
                this.designers.forEach(item => item.names = `${item.surname} ${item.name}`)})
                .catch(err => console.log(err));

            axios.get('api/enginners').then(response =>{
                this.enginners = response.data;
                this.enginners.forEach(item => item.names = `${item.surname} ${item.name}`)})
                .catch(err => console.log(err));;

            axios.get('api/technician')
                .then(response =>{
                    this.technician = response.data;
                    this.technician.forEach(item => item.names = `${item.surname} ${item.name}`)})
                .catch(err => console.log(err));
            axios.get('api/lab_asistant')
                .then(response =>{
                this.labAsistant = response.data;
                this.labAsistant.forEach(item => item.names = `${item.surname} ${item.name}`)})
                .catch(err => console.log(err));
        }
    }
</script>