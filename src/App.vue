<template>

  <router-view :getData="dataState"
               v-on:getNewPerson="getPerson"
               v-on:add-related="addRelatedPeople"
               :bsnError="bsnError"
               :selected="selected"
               :related="relatedPeople"
               :home="home"
               :items="items"/>
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
  data() {
    return {
      home: {label: "BSN zoeken", to: '/'},
      items: [
        {label: 'Steven King'},
        {label: 'Jeanette King'},
        {label: 'Neena Kochhhar'}
      ]
    }
  },
  methods: {
    getPerson(bsn) {
      console.log('hello', bsn);
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
body {
  overflow: hidden;
}
#app {
  font-family: AvenirNext-Regular, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 400px auto;
  grid-template-rows: 50px 100px 200px auto;
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
  font-size: .75rem!important;
}
.p-card .p-card-body {
  padding: 0!important;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.p-card-header {
  display: flex;
  align-items: center;
  padding-left: .5em;
}
.p-card-subtitle {
  display: flex;
  justify-content: flex-start;
  padding-left: .5rem;
  font-size: .5rem!important;
}
.p-card-title {
  display: flex;
  justify-content: flex-start;
  padding-left: .5rem;
  margin-bottom: 0.25rem!important;
}
.domain:first-of-type {
  color: white;
}
.y-axis {
  opacity:0;
}
.network .domain:first-of-type {
  color: rgb(0,0,0);
}
.network .y-axis .domain {
  opacity:0;
}
.network .tick line{
  opacity:0;
}
.relations .tick {
  color: rgb(255 255 255);
}
.tooltip {
  position: absolute;
  text-align: center;
  width: max-content;
  height: 2.5em;
  padding: 1em 1em;
  font: 12px sans-serif;
  background: #299EFD;
  border: 0;
  border-radius: 2px;
  color:white;
  font-weight: bold;
  padding-top:.5em;
  pointer-events: none;
  opacity: 0;
}
.vertical-line {
  position: absolute;
  text-align: center;
  width: 5px;
  height: 60em;
  z-index: 1;
  background: #3CDBC4;
  border: 0;
  color:white;
  pointer-events: none;
  opacity: 0;
}
.p-breadcrumb ul li.p-breadcrumb-chevron {
  transform: scale(0.5);
}
li .p-menuitem-text {
  font-size: .7em;
  line-height: 50px!important;
}
.p-breadcrumb {
  position: fixed;
  top:0;
  left:0;
  right:0;
}
.p-multiselect {
  width: 15em;
  height: max-content;
}
/* Slider Specifications */
.p-slider .p-slider-handle {
  height: 0.743rem;
  width: 0.743rem;
  background: #ffffff;
  border: 1px solid #909090;
}
.p-slider.p-slider-horizontal .p-slider-handle {
  margin-top: -0.3415rem;
  margin-left: -0.3415rem;
}
.p-slider .p-slider-range {
  background: #909090;
}
.p-slider.p-slider-horizontal {
  height: 0.186rem;
}
.relations svg:first-of-type {
  border-bottom: dotted 2px;
  /*border-top: dotted 2px;*/
}
</style>
