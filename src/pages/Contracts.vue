<template>
    <div>
        <contracts-table></contracts-table>
        <contracts-dialog></contracts-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import ContractsTable from "../components/Contracts/ContractsTable";
    import ContractsDialog from "../components/Contracts/ContractsDialog";
    import Snackbar from "../components/other/Snackbar";
    export default {
        name: "Contracts",
        components: {Snackbar, ContractsDialog, ContractsTable},
    }
</script>

<style scoped>

</style>