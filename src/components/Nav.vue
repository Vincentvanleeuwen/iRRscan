<template>
  <nav class="p-grid p-p-3">
    <section class="p-col-6">
      <router-link to="/" class="p-col">
        Home
      </router-link>
      <router-link to="/about" class="p-col">About</router-link>
    </section>
    <Dropdown
      v-model="selected"
      :options="items"
      optionLabel="name"
      placeholder="Select an item"
      class="p-col-4"
    />
  </nav>
</template>

<script>
import Dropdown from "primevue/dropdown";
export default {
  name: "Nav",
  components: {
    Dropdown
  },
  data() {
    return {
      selected: null,
      items: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" }
      ]
    };
  }
};
</script>
