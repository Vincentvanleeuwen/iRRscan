<template>
  <section class="home">
    <form class="searchbar" @submit.prevent="$emit('getNewPerson', bsn)">
      <span class="p-input">
        <InputText type="text" v-model="bsn" placeholder="Zoek naar een BSN" />
      </span>
      <Button icon="pi pi-search" class="p-button" @click="$emit('getNewPerson', bsn)"/>
    </form>
    <section class="error" v-if="bsnError">
      <p> Dit BSN is niet in ons systeem bekend.</p>
    </section>
  </section>
  <section class="examples">
    <h2> List of example people </h2>
    <div class="example-person">
      <h4> Neena Kochhhar </h4>
      <p> 2458288 </p>
    </div>
    <div class="example-person">
      <h4> Steven King </h4>
      <p> 2458292 </p>
    </div>
    <div class="example-person">
      <h4> Eleni Zlotkey </h4>
      <p> 2458654</p>
    </div>
  </section>
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
  emits: ["bsnError", "getNewPerson"],
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
.examples {
  grid-row-start: 3;
  margin-left: 5em;
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
