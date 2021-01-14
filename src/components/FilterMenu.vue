<template>
  <section class="filter-menu">

    <MultiCheckbox :name="'Relatie types'"
                   :boxes="['Familie', 'Werk', 'School']"
                   :vModel="relationTypes"></MultiCheckbox>

    <section class="date-of-birth">
      <h4>Geboortejaar | {{ageRange[0]}} - {{ageRange[1]}}</h4>
      <Slider v-model="ageRange" :range="true" :min="1900" :max="2021"/>
    </section>
    <MultiCheckbox :name="'Functie'"
                   :boxes="['Manager', 'Senior Employee', 'Junior Employee']"
                   :vModel="companyFunction"></MultiCheckbox>

    <MultiCheckbox :name="'Geslacht'"
                   :boxes="['Man', 'Vrouw']"
                   :vModel="sexCheckbox"></MultiCheckbox>

    <section class="companies">
      <h4>Bedrijven</h4>
      <MultiSelect v-model="selectedCompanies"
                   :options="companies"
                   optionLabel="name"
                   placeholder="Selecteer een bedrijf"
                   display="chip"
                   :filter="true"

                   class="multiselect-custom">
        <template #value="slotProps">
          <div class="country-item country-item-value" v-for="option of slotProps.value" :key="option.department_id">
            <div>{{option.name}}</div>
          </div>
          <template v-if="!slotProps.value || slotProps.value.length === 0">
            Selecteer een bedrijf
          </template>
        </template>
        <template #option="slotProps">
          <div class="country-item">
            <div>{{slotProps.option.name}}</div>
          </div>
        </template>
      </MultiSelect>
    </section>
  </section>
</template>

<script>
import Slider from "primevue/slider";
import MultiSelect from "primevue/multiselect";
import MultiCheckbox from "@/components/MultiCheckbox";

export default {
  name: "FilterMenu",
  components: {
    Slider,
    MultiSelect,
    MultiCheckbox
  },
  props: ["types", "age", "function", "sex", "selected", "departments"],
  data: function () {
    return {
      relationTypes: this.types,
      ageRange: this.age,
      companyFunction: this.function,
      sexCheckbox: this.sex,
      selectedCompanies: this.selected,
      companies: this.departments
    }
  }
}
</script>

<style scoped>

</style>
