<template>
  <div>
    <table border="1">
      <tr>
        <td>ID</td>
        <td>Name</td>
        <!--<td>Category</td>-->
      </tr>
      <tr v-for="contract in contracts" :key="contract.id">
        <td>{{contract.id}}</td>
        <!--<td>{{plane.weight}}</td>-->
      </tr>
    </table>
    <p>{{contracts}}</p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        contracts: {}
      };
    },
    props: {
      msg: String
    },
    mounted() {
      axios.get("api/contracts")
              .then(res => {
                this.contracts = res.data;
                // this.planes.sort((a, b) => {return a.id - b.id})
              });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>