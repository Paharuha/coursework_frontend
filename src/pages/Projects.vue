<template>
    <div>
        <projects-table></projects-table>
        <projects-dialog></projects-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import ProjectsTable from "../components/Projects/ProjectsTable";
    import ProjectsDialog from "../components/Projects/ProjectsDialog";
    import Snackbar from "../components/other/Snackbar";
    export default {
        name: "Projects",
        components: {Snackbar, ProjectsDialog, ProjectsTable}
    }
</script>

<style scoped>

</style>