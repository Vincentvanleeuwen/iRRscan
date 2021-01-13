<template>
  <section class="home">
    <form class="searchbar" @submit.prevent="$emit('get-person', bsn)">
      <span class="p-input">
        <InputText type="text" v-model="bsn" placeholder="Zoek naar een BSN" />
      </span>
      <Button icon="pi pi-search" class="p-button" @click="$emit('get-person', bsn)"/>
    </form>
    <section class="error" v-if="bsnError">
      <p> Dit BSN is niet in ons systeem bekend.</p>
    </section>
  </section>

<!--  <div v-for="person in getData.people"-->
<!--       v-bind:key="person.id">-->
<!--      {{ person.name}}-->
<!--  </div>-->

</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from "vue";
export default {
  name: "Home",
  props: {
    getData: {
      type: Array
    },
    bsnError: {
      type: Boolean
    }
  },
  emits: ["bsnError"],
  components: {
    InputText,
    Button
  },
  setup() {
    let bsn = ref('');
    let error = ref(null);
    return {
      bsn,
      error
    }
  }
};
</script>
<style scoped>
.home {
  grid-column-start: 2;
  grid-row-start: 2;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 20vh);
  position: relative;
}
.searchbar {
  margin: auto;
  z-index: 10;
}
.p-input {
  margin-right: 1em;
}
.error {
  opacity: 0.7;
  color: red;
  padding: 0 1em;
  position: absolute;
  font-weight: bold;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: move-down 1s forwards;
  z-index: 1;
}
@keyframes move-down {
  from {
    top: 50%;
  }
  to {
    top: 58%;
  }
}
</style>
