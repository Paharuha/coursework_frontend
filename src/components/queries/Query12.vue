<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>

        <v-data-table
                :headers="headers"
                :items="items"
                :loading="loading"
                class="elevation-10"
        >
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:items="props">
                <td @click="cl">{{ props.item.nameContracts }}</td>
                <td>{{ props.item.first }}</td>
                <td>{{ props.item.second }}</td>
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
        name: "Query12",
        components: {UniversalTable},
        data() {
            return {
                /*props for table*/
                items: [],
                headers: [
                    {text: 'Назва контратку', value: 'nameContracts', sortable: false},
                    {text: 'Вартість/дні', value: 'dateStart', sortable: false},
                    {text: 'Вартість/люди', value: 'dateEnd', sortable: false},
                ],
                loading: true,
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
            cl() {
                console.log(this.items);
            }
        },
        mounted() {
            axios.get("/api/contracts")
                .then(response => {
                    this.items = response.data;
                    for (let i = 0; i < this.items.length; i++) {
                        axios.get('/api/contracts/find-by-rahun', {
                            params: {
                                "id": this.items[i].id
                            }
                        }).then(response => {
                            this.items.splice(i, 1, {
                                ...this.items[i],
                                first: response.data[0][0],
                                second: response.data[0][1],
                            });
                        })
                    }
                })
                .finally(() => {
                });
        }
    }
</script>

<style scoped>
    .btn {
        z-index: 9999;
    }
</style>