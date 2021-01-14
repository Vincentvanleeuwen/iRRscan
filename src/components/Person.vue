<template>
    <div class="person">
      <Card class="card">
        <template #header>
          <img :src="require(`@/assets/img/${selected.sex}.png`)" :alt="selected.sex">
        </template>
        <template #title>
          {{selected.name}} {{$emit('get-age', selected.date_of_birth)}}
        </template>
      </Card>
      <ClevelandPlot :selected="selected" :xDomain="xDomain"/>
    </div>
</template>

<script>
import Card from 'primevue/card';
import ClevelandPlot from "@/components/ClevelandPlot";
export default {
  name: "Person",
  props: ["selected", "xDomain"],
  emits: ["get-company", "get-age"],
  components: {
    Card,
    ClevelandPlot
  },
  mounted() {
    console.log(this.selected,this.xDomain)
  }
}
</script>

<style scoped>
.card {
  min-width: 10em;
  max-height: 10em;
  margin: .5em;
}
.person {
  display:flex;
  flex-direction: row;
}
/* Change card style of primevue card*/
.p-card-header img {
  max-width: 100px;
}

</style>
