<template>
    <div>
    <subcontracting-table></subcontracting-table>
        <subcontracting-dialog></subcontracting-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import SubcontractingTable from "../components/Subcontracting/SubcontractingTable";
    import SubcontractingDialog from "../components/Subcontracting/SubcontractingDialog";
    import Snackbar from "../components/other/Snackbar";
    export default {
        name: "Subcontracting",
        components: {Snackbar, SubcontractingDialog, SubcontractingTable}
    }
</script>

<style scoped>

</style>