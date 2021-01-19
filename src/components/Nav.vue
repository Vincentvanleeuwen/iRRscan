<template>
  <Breadcrumb :home="breadcrumbHome" :model="breadcrumbs" class="breadcrumbs"/>

  <form class="searchbar" @submit.prevent="$emit('get-person', newID)">
    <span class="p-input-icon-left">
        <i class="pi pi-search" @click="$emit('get-person', newID)"/>
        <InputText type="text" v-model="bsn" placeholder="Zoek naar een BSN" />
    </span>
  </form>
  <nav class="type-nav">
    <section class="p-grid p-p-3">
      <router-link to="/" class="p-col navigation-entry">
        Familie
      </router-link>
      <router-link to="/" class="p-col navigation-entry">
        Werk
      </router-link>
      <router-link to="/" class="p-col navigation-entry active">
        School
      </router-link>
    </section>

  </nav>

</template>

<script>
import InputText from 'primevue/inputtext'
import Breadcrumb from 'primevue/breadcrumb';
import { ref } from "vue";
export default {
  name: "Nav",
  components: {
    InputText,
    Breadcrumb
  },
  emits: ["get-person"],
  props: {
    networkHome: {
      type: Object
    },
    networkItems: {
      type: Array
    }
  },
  data() {
    return {
      breadcrumbs: this.networkItems,
      breadcrumbHome: this.networkHome,
      newID: this.bsn
    }
  },
  setup() {
    let bsn = ref();
    return { bsn }
  },
  mounted() {
    console.log(this.breadcrumbs)
  }

};
</script>

<style scoped>
.p-inputtext {
  border-top: 0;
  border-left: 0;
  border-right: 0;
}
.p-inputtext:focus{
  border-top: 0;
  border-left: 0;
  border-right: 0;
  box-shadow: none!important;
}
.type-nav {
  grid-column-start: 2;
  grid-row-start: 2;
  display: flex;
  align-items: flex-end;

  background-color: white;

}
.searchbar {
display: flex;
align-items: flex-end;
padding-left: 6em;
position: fixed;
top:110px;
left: 0;
}
.active {
border: solid 1px #1F1F1E;
}
.navigation-entry {
width: 12em;
height: 2em;
box-shadow: rgba(0,0,0,0.2) 0 3px 6px;
margin: 0 1em;
display: flex;
justify-content: center;
align-items: center;
text-decoration: none;
border-radius: 3px;
color: #1F1F1E;
}
.navigation-entry:hover {
border: solid 1px #909090;
transition: 1s;
}

nav section {
display: flex;
justify-content: space-around;
align-items: flex-end;
}
.breadcrumbs {
grid-column: 1 / span 2;
border:none;
grid-row-start: 1;
padding-left: 6em;
z-index: 999;
}

</style>
