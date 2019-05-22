<template>
    <div>
        <personal-table></personal-table>
        <personal-dialog></personal-dialog>'
        <snackbar></snackbar>
    </div>
</template>

<script>
    import PersonalTable from "../components/Personal/PersonalTable";
    import PersonalDialog from "../components/Personal/PersonalDialog";
    import Snackbar from "../components/other/Snackbar";
    export default {
        name: "Personal",
        components: {Snackbar, PersonalDialog, PersonalTable}
    }
</script>

<style scoped>

</style>