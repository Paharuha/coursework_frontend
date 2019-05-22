<template>
    <div>
        <technician-table></technician-table>
        <technician-dialog></technician-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import TechnicianTable from "../components/Technician/TechnicianTable";
    import TechnicianDialog from "../components/Technician/TechnicianDialog";
    import Snackbar from "../components/other/Snackbar";
    export default {
        name: "Technician",
        components: {Snackbar, TechnicianDialog, TechnicianTable}
    }
</script>

<style scoped>

</style>