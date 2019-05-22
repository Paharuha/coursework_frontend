import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from "./components/HelloWorld";
import Equiment from "./pages/Equiment";
import Contracts from "./pages/Contracts";
import ContractsProjects from "./pages/ContractsProjects";
import Designers from "./pages/Designers";
import Division from "./pages/Division";
import Enginners from "./pages/Enginners";
import GroupPeople from "./pages/GroupPeople";
import HeadDepartment from "./pages/HeadDepartment";
import LabAsistant from "./pages/LabAsistant";
import Personal from "./pages/Personal";
import Technician from "./pages/Technician";
import Projects from "./pages/Projects";
import Subcontracting from "./pages/Subcontracting";
import Query3 from "./components/queries/Query3";
import Query4 from "./components/queries/Query4";
import Query5 from "./components/queries/Query5";
import Query6 from "./components/queries/Query6";
import Query7 from "./components/queries/Query7";
import Query8 from "./components/queries/Query8";
import Query1 from "./components/queries/Query1";
import Query9 from "./components/queries/Query9";
import Query10 from "./components/queries/Query10";
import Query11 from "./components/queries/Query11";
import Query13 from "./components/queries/Query13";
import Query12 from "./components/queries/Query12";

Vue.use(VueRouter);

const routes = [
    {path: "/equiment", component: Equiment},
    {path: "/contracts", component: Contracts},
    {path: "/contracts_projects", component: ContractsProjects},
    {path: "/designers", component: Designers},
    {path: "/division", component: Division},
    {path: "/enginners", component: Enginners},
    {path: "/group_people", component: GroupPeople},
    {path: "/head_department", component: HeadDepartment},
    {path: "/lab_asistant", component: LabAsistant},
    {path: "/personal", component: Personal},
    {path: "/technician", component: Technician},
    {path: "/projects", component: Projects},
    {path: "/subcontracting", component: Subcontracting},
    {path: "/query1", component: Query1},
    {path: "/query3", component: Query3},
    {path: "/query4", component: Query4},
    {path: "/query5", component: Query5},
    {path: "/query6", component: Query6},
    {path: "/query7", component: Query7},
    {path: "/query8", component: Query8},
    {path: "/query9", component: Query9},
    {path: "/query10", component: Query10},
    {path: "/query11", component: Query11},
    {path: "/query12", component: Query12},
    {path: "/query13", component: Query13},
    {path: '*', component: HelloWorld}
];

export default new VueRouter({
    mode: 'history',
    routes
});