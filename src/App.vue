<template>
  <Nav />
  <router-view />
</template>

<script>
import Nav from "./components/Nav.vue";
import { fetchData } from "@/helpers/fetchData";
import { convertToJSON } from "@/utils/convertToJSON";
import { filterColumns } from "@/helpers/filterColumns";
import { restructureData } from "@/helpers/restructureData";
const endPoints = [
  // "./data/nodes.json",
  "./data/anb.json",
  "./data/edges.json"
];
export default {
  name: "App",
  components: {
    Nav
  },
  mounted() {
    fetchData(endPoints)
      .then(convertToJSON)
      .then(filterColumns)
      .then(restructureData)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
