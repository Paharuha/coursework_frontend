<template>
    <div>
        <designers-table></designers-table>
        <designers-dialog></designers-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import DesignersTable from "../components/Designers/DesignersTable";
    import DesignersDialog from "../components/Designers/DesignersDialog";
    import Snackbar from "../components/other/Snackbar";

    export default {
        name: "Designers",
        components: {Snackbar, DesignersDialog, DesignersTable}
    }
</script>

<style scoped>

</style>