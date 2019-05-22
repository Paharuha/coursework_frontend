<template>
    <div>
    <head-department-table></head-department-table>
    <head-department-dialog></head-department-dialog>
    <snackbar></snackbar>
    </div>
</template>

<script>
    import HeadDepartmentTable from "../components/HeadDepartment/HeadDepartmentTable";
    import HeadDepartmentDialog from "../components/HeadDepartment/HeadDepartmentDialog";
    import Snackbar from "../components/other/Snackbar";
    export default {
        name: "HeadDepartment",
        components: {Snackbar, HeadDepartmentDialog, HeadDepartmentTable}
    }
</script>

<style scoped>

</style>