<template>
    <div>
        <enginners-table></enginners-table>
        <enginners-dialog></enginners-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import EnginnersTable from "../components/Enginners/EnginnersTable";
    import EnginnersDialog from "../components/Enginners/EnginnersDialog";
    import Snackbar from "../components/other/Snackbar";
    export default {
        name: "Enginners",
        components: {Snackbar, EnginnersDialog, EnginnersTable}
    }
</script>

<style scoped>

</style>