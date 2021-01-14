<template>
<!--    <div class="card">-->
<!--      <div class="card-content">-->
<!--        <div class="gender">-->
<!--          <div class="extra-width">-->
<!--            <img :src="require(`@/assets/img/${selected.sex}.png`)" :alt="selected.sex">-->
<!--          </div>-->
<!--        </div>-->

<!--        <p class="thin">{{$emit('get-company', selected.department_id)}}</p>-->
<!--        <p class="name">{{selected.name}}<span class="age"> ({{$emit('get-age', selected.date_of_birth)}})</span></p>-->
<!--        <p class="thin">{{selected.position}}</p>-->
<!--        <p class="small-thick-font"> BSN: {{selected.node_id}}</p>-->

<!--      </div>-->

<!--    </div>-->
    <div class="person">
      <Card class="card">
        <template #header>
          <img :src="require(`@/assets/img/${selected.sex}.png`)" :alt="selected.sex">
        </template>
        <template #title class="name">
          {{selected.name}} ({{$emit('get-age', selected.date_of_birth)}})
        </template>
      </Card>
      <ClevelandPlot />
    </div>

</template>

<script>
import Card from 'primevue/card';
import ClevelandPlot from "@/components/ClevelandPlot";
export default {
  name: "Person",
  props: ["selected"],
  emits: ["get-company", "get-age"],
  components: {
    Card,
    ClevelandPlot
  }
}
</script>

<style scoped>
.card {
  width: 15em;
  margin: .5em 0;
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
