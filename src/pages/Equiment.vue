<template>
    <div>
        <equiment-table></equiment-table>
        <equiment-dialog></equiment-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import Snackbar from "../components/other/Snackbar";
    import EquimentTable from "../components/Equiment/EquimentTable";
    import EquimentDialog from "../components/Equiment/EquimentDialog";

    export default {
        name: "Equiment",
        components: {EquimentDialog, EquimentTable, Snackbar},
    }
</script>

<style scoped>

</style>