<template>
    <div>
        <group-people-table></group-people-table>
        <group-people-dialog></group-people-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import GroupPeopleTable from "../components/GroupPeople/GroupPeopleTable";
    import GroupPeopleDialog from "../components/GroupPeople/GroupPeopleDialog";
    import Snackbar from "../components/other/Snackbar";
    export default {
        name: "GroupPeople",
        components: {Snackbar, GroupPeopleDialog, GroupPeopleTable}
    }
</script>

<style scoped>

</style>