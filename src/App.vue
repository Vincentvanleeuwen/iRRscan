<template>

  <router-view :getData="dataState"
               v-on:get-person="getPerson"
               v-on:add-related="addRelatedPeople"
               :bsnError="bsnError"
               :selected="selected"
               :related="relatedPeople"/>
</template>

<script>
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";

import { fetchData } from "@/helpers/fetchData";
import { convertToJSON } from "@/utils/convertToJSON";
import { filterColumns } from "@/helpers/filterColumns";
import { restructureData } from "@/helpers/restructureData";
import router from './router/index'
import { addSchoolHistory } from "@/helpers/addSchoolHistory";
const endPoints = [
  // "./data/nodes.json",
  "./data/anb.json",
  "./data/edges.json"
];
export default {
  name: "App",
  setup() {
    let dataState = ref([]);
    let error = ref(null);
    let bsnError = ref(null);
    let selected = ref(null);
    let relatedPeople = ref([]);

    onMounted(() => {
      fetchData(endPoints)
      .then(convertToJSON)
      .then(filterColumns)
      .then(restructureData)
      .then(addSchoolHistory)
      .then(result => {
        dataState.value = result
        console.log(result)
      })
      .catch(err => error.value = err);
    })

    return {
      dataState,
      error,
      bsnError,
      selected,
      relatedPeople
    }
  },
  methods: {
    getPerson(bsn) {
      this.selected = this.dataState.people.find(person => person.node_id === parseInt(bsn));
      this.bsnError = !this.selected;

      // If no error, send to next page
      if(!this.bsnError) {
        router.push({ name: "NetworkView" });
      }

    }
  }

};
</script>
<style>
@font-face {
  font-family: "AvenirNext-UltraLight";
  src: local("AvenirNext-UltraLight"),
  url(./assets/fonts/AvenirNext-UltraLight.ttf) format("truetype");
}
@font-face {
  font-family: "AvenirNext-Bold";
  src: local("AvenirNext-Bold"),
  url(./assets/fonts/AvenirNext-Bold.ttf) format("truetype");
}
#app {
  font-family: AvenirNext-Regular, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: 200px 200px auto;
  height: 100vh;
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
.p-card-title {
  font-size: 1rem!important;
}
.p-card .p-card-body {
  padding: 0!important;
}
</style>
