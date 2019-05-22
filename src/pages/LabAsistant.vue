<template>
    <div>
        <lab-asistant-table></lab-asistant-table>
        <lab-asistant-dialog></lab-asistant-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import LabAsistantTable from "../components/LabAsistant/LabAsistantTable";
    import LabAsistantDialog from "../components/LabAsistant/LabAsistantDialog";
    import Snackbar from "../components/other/Snackbar";
    export default {
        name: "LabAsistant",
        components: {Snackbar, LabAsistantDialog, LabAsistantTable}
    }
</script>

<style scoped>

</style>