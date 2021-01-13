<template>
  <Nav/>
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
                   :options="getData.departments"
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

  <section class="network">
  <Person :selected="selected" v-on:get-company="getCompany" v-on:get-age="getAge"/>
  </section>
  <section class="relations p-d-flex p-flex-wrap">
    <Person v-for="relation in relatedPeople"
            v-on:get-company="getCompany"
            v-on:get-age="getAge"
            v-bind:key="relation.id"
            :selected="relation"/>
  </section>

</template>

<script>
import Slider from 'primevue/slider';
import MultiSelect from 'primevue/multiselect';
import MultiCheckbox from "@/components/MultiCheckbox";
import Nav from "@/components/Nav";
import Person from "@/components/Person";
export default {
  name: "NetworkView",
  props: {
    getData: {
      type: Array
    },
    selected: {
      type: Object
    },
    related: {
      type: Array
    }
  },
  emits: ["get-person", "add-related"],
  components: {
    Nav,
    Person,
    Slider,
    MultiSelect,
    MultiCheckbox
  },
  data: function() {
    return {
      relatedPeople: this.related,
      relationTypes: ["Familie", "Werk", "School"],
      ageRange: [1950, 2021],
      companyFunction: ["Manager", "Senior Employee", "Junior Employee"],
      sexCheckbox: ["Man", "Vrouw"],
      selectedCompanies: null
    }
  },
  mounted() {
    let dates = [];

    // Add all related people in a separate Array
    this.selected.relations.forEach(relation => {
      return this.addRelatedPeople(relation[1]);
    });

    this.relatedPeople.forEach(person => dates.push(parseInt(person.date_of_birth.slice(0, 4))) )
    this.ageRange = [Math.min(...dates), Math.max(...dates)]
  },
  methods: {
    getCompany(id) {
      let company = this.getData.departments.find(department => department.id === id);
      console.log('currr', company)
      if(!company) {
        return "No Company Found"
      }
      return company.name;
    },
    // https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
    getAge(birthdate) {

      var today = new Date();
      var birthDate = new Date(birthdate);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    addRelatedPeople(bsn) {
      let newRelation = this.getData.people.find(person => person.node_id === parseInt(bsn));
      if(newRelation) {
        this.relatedPeople.push(newRelation)
      }
      newRelation = null;
    }
  }
};
</script>
<style scoped>
  .network {
    grid-column-start: 2;
    grid-row-start: 1;
  }
  .relations {
    grid-column-start: 2;
    grid-row-start: 2;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .filter-menu {
    padding-left: 2em;
    grid-column-start: 1;
    grid-row-start: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .function, .sex, .relation-types, .companies {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>
