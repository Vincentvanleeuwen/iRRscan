<template>

    <div class="person" >
      <div class="card-container">
        <Card class="card">
          <template #header>
            <img :src="require(`@/assets/img/${selected.sex}.png`)" :alt="selected.sex">
          </template>
          <template #title>
            {{selected.name}} {{$emit('get-age', selected.date_of_birth)}}
          </template>
          <template #subtitle>
            {{getPosition(selected.position)}}
          </template>
          <template #content>
            <div class="relation-container">

              <div class="relation-color"
                   v-for="relationType in relations"
                   v-bind:key="relationType"
                  :style="{backgroundColor: getColor(relationType)}">
              </div>
            </div>

          </template>
        </Card>
        <div class="dropdown-menu">
          <Button label="Vergelijken" class="p-button-secondary" @click="$emit('compare-person', selected)"/>
          <Button label="Bovenaan" class="p-button-secondary" @click="$emit('set-person', selected.node_id)"/>
          <div class="stick-out">
            <i class="pi pi-angle-down"></i>
          </div>
        </div>
      </div>

      <ClevelandPlot :selected="selected" :xDomain="xDomain"/>
    </div>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button'
import ClevelandPlot from "@/components/ClevelandPlot";
import { onBeforeMount } from "@vue/runtime-core";


export default {
  name: "Person",
  props: ["selected", "xDomain", "relations"],
  emits: ["get-company", "get-age", "get-relations", "compare-person", "set-person"],
  components: {
    Card,
    ClevelandPlot,
    Button
  },
  setup(props, { emit }) {
    onBeforeMount(() => {
      emit("get-relations", props.selected.node_id);
    });
  },
  methods: {
    // Set the position name of function
    getPosition(position) {
      switch(position) {
        case "YOUNG_MALE_EMPLOYEE":
          return "Junior werknemer"
        case "YOUNG_FEMALE_EMPLOYEE":
          return "Junior werkneemster"
        case "SENIOR_MALE_EMPLOYEE":
          return "Senior werknemer"
        case "SENIOR_FEMALE_EMPLOYEE":
          return "Senior werkneemster"
        case "MANAGER":
          return "Manager"
      }
    },
    // Show correct color
    getColor(relation) {
      switch(relation) {
        case "work": return "#7BC4AF"
        case "family": return "#58838B"
        case "school": return "#FC9F55"
      }
    }
  }
}
</script>

<style scoped>
.card-container {
  width: 11em;
  height: 5em;
  margin: .5em 5em .5em .5em;
  position: relative;
}
.card {
  display: flex;
  width: 100%;
  height:100%;
  z-index: 5;
  position: relative;
  padding: 0;
}
.network .card {
  border: 2px solid #495057;
}

.network .dropdown-menu {
  display: none;
}
.dropdown-menu {
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 50%;
  left: 25%;
  height: 50%;
  background-color: #ffffff;
  box-shadow: none;
  display: flex;
  justify-content: center;
}
.card-container:hover .dropdown-menu{
  animation: forwards ease-in-out drop-down .5s;
}
.stick-out {
  width: 50%;
  position: absolute;
  top: 100%;

}
.p-button-secondary {
  font-size: .3rem;
  color: #ffffff;
  background: #607D8B;
  border: 1px solid #607D8B;
  width: 5rem;
  margin: .7rem .5rem;
  height: 1rem;
}
.relation-color {
  background-color: #7BC4AF;
  width: .5em;
  height: 1em;
}
.person {
  display:flex;
  flex-direction: row;
  padding: 1em;
  align-items: center;
}
.network .relation-container{
  display: none;
}
.relation-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: .5em;
  align-items: flex-end;
}
.relation-color {
  width: 1em;
  height: .5em;
  margin: 0 .1em;
}
/* Change card style of primevue card*/
.p-card-header img {
  max-width: 75px;
}
@keyframes drop-down {
  0% {
    width: 50%;
    left:25%;
    top:50%;
    box-shadow: none;
  }
  25% {
    width: 100%;
    left:0;
    top:50%;
    box-shadow: none;
  }
  75% {
    width: 100%;
    left:0;
    top:100%;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  }
  100% {
    width: 100%;
    left: 0;
    top: 95%;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  }
}
</style>
