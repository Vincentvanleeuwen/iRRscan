<template>
  <section class="relation-types">
    <h4>{{ name }}</h4>

    <div class="p-field-checkbox" v-for="types in boxes" v-bind:key="types">
      <Checkbox :id="types" :name="types" :value="types" v-model="connectBoxes" />
      <label :for="types">{{ types }}</label>
    </div>
  </section>
</template>

<script>
import Checkbox from 'primevue/checkbox';
export default {
  name: "MultiCheckbox",
  props: ["name", "boxes", "vModel"],
  components: {
    Checkbox
  },
  data: function() {
    return {
      connectBoxes: this.vModel
    }
  }
}
</script>

<style scoped>

</style>
