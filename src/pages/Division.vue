<template>
    <div>
        <division-table></division-table>
        <division-dialog></division-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import DivisionTable from "../components/Division/DivisionTable";
    import DivisionDialog from "../components/Division/DivisionDialog";
    import Snackbar from "../components/other/Snackbar";
    export default {
        name: "Division",
        components: {Snackbar, DivisionDialog, DivisionTable}
    }
</script>

<style scoped>

</style>