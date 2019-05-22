<template>
    <nav>
        <v-toolbar :clipped="primaryDrawer.clipped" app absolute>
            <v-toolbar-side-icon
                    v-if="primaryDrawer.type !== 'permanent'"
                    @click="primaryDrawer.model = !primaryDrawer.model"
            ></v-toolbar-side-icon>
            <v-toolbar-title>База даних</v-toolbar-title>
        </v-toolbar>
        <v-navigation-drawer
                v-model="primaryDrawer.model"
                :permanent="primaryDrawer.type === 'permanent'"
                :temporary="primaryDrawer.type === 'temporary'"
                :clipped="primaryDrawer.clipped"
                :floating="primaryDrawer.floating"
                absolute
                overflow
                app
        >
            <v-toolbar>
                <v-list dense>
                    <v-list-tile>
                        <v-list-tile-title class="title">
                            Меню
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-list class="pt-1">
                <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        @click="go(item.path)"
                >
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

        </v-navigation-drawer>
    </nav>
</template>

<script>
    export default {
        name: "Navigation",
        data() {
            return {
                drawer: false,
                primaryDrawer: {
                    model: false,
                    type: 'temporary',
                    clipped: true,
                    floating: true,
                },
                footer: {
                    inset: true
                },
                items: [
                    {title: 'Контратки', path: "/contracts"},
                    {title: 'Обладнання', path: "/equiment"},
                    {title: 'КонтраткПроект', path: "/contracts_projects"},
                    {title: 'Дизайнери', path: "/designers"},
                    {title: 'Відділи', path: "/division"},
                    {title: 'Інженери', path: "/enginners"},
                    {title: 'Групи людей', path: "/group_people"},
                    {title: 'Керівники відділів', path: "/head_department"},
                    {title: 'Асистенти', path: "/lab_asistant"},
                    {title: 'Інший персонал', path: "/personal"},
                    {title: 'Техніки', path: "/technician"},
                    {title: 'Проекти', path: "/projects"},
                    {title: 'Матеріали', path: "/subcontracting"},
                    {title: 'Запит №1', path: "/query1" },
                    {title: 'Запит №2', path: "/head_department"},
                    {title: 'Запит №3', path: "/query3"},
                    {title: 'Запит №4', path: "/query4"},
                    {title: 'Запит №5', path: "/query5"},
                    {title: 'Запит №6', path: "/query6"},
                    {title: 'Запит №7', path: "/query7"},
                    {title: 'Запит №8', path: "/query8"},
                    {title: 'Запит №9', path: "/query9"},
                    {title: 'Запит №10', path: "/query10"},
                    {title: 'Запит №11', path: "/query11"},
                    {title: 'Запит №12', path: "/query12"},
                    {title: 'Запит №13', path: "/query13"},
                ]
            }
        },
        methods: {
            go(path) {
                this.$router.push(path)
            }
        }
    }
</script>