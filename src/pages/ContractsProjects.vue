<template>
    <div>
    <contracts-projects-table></contracts-projects-table>
    <contracts-projects-dialog></contracts-projects-dialog>
    <snackbar></snackbar>
    </div>
</template>

<script>
    import ContractsProjectsTable from "../components/ContractsProjects/ContractsProjectsTable";
    import ContractsProjectsDialog from "../components/ContractsProjects/ContractsProjectsDialog";
    import Snackbar from "../components/other/Snackbar";
    export default {
        name: "ContractsProjects",
        components: {Snackbar, ContractsProjectsDialog, ContractsProjectsTable}
    }
</script>

<style scoped>

</style>