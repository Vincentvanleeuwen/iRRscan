<template>
    <div class="person">
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
          <div class="relation-color"
               v-for="relationType in relationsToSelected"
               v-bind:key="relationType.id">
          </div>
        </template>
      </Card>
      <ClevelandPlot :selected="selected" :xDomain="xDomain"/>
    </div>
</template>

<script>
import Card from 'primevue/card';
import ClevelandPlot from "@/components/ClevelandPlot";
// import {onMounted} from "@vue/runtime-core";
import { ref } from "vue";

export default {
  name: "Person",
  props: ["selected", "xDomain"],
  emits: ["get-company", "get-age", "get-relations"],
  components: {
    Card,
    ClevelandPlot
  },
  setup() {
    let relationsToSelected = ref([]);

    // onMounted(() => {
    //   // console.log(this.selected,this.xDomain)
    //   relationsToSelected.value = this.$emit("get-relations", this.selected.node_id);
    // });
    return relationsToSelected
  },
 mounted() {
   this.$emit("get-relations", this.selected.node_id)
 },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  min-width: 11em;
  max-height: 6em;
  margin: .5em;
}
.relation-color {
  background-color: #7BC4AF;
  width: .5em;
  height: 1em;
}
.person {
  display:flex;
  flex-direction: row;
}
/* Change card style of primevue card*/
.p-card-header img {
  max-width: 75px;
}

</style>
