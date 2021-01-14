<template>
  <Nav/>
  <FilterMenu :types="relationTypes"
              :age="ageRange"
              :function="companyFunction"
              :sex="sexCheckbox"
              :selected="selectedCompanies"
              :departments="getData.departments"/>

  <section class="network">
  <Person :selected="selected"
          v-on:get-company="getCompany"
          v-on:get-age="getAge"/>
  </section>
  <section class="relations p-d-flex p-flex-column">
    <Person v-for="relation in relatedPeople"
            v-on:get-company="getCompany"
            v-on:get-age="getAge"
            v-bind:key="relation.id"
            :selected="relation"/>
  </section>


</template>

<script>

import Nav from "@/components/Nav";
import Person from "@/components/Person";
import FilterMenu from "@/components/FilterMenu";
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
    FilterMenu,
    Nav,
    Person
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
    grid-row-start: 2;
  }
  .network .card {
    border: rgb(208, 116, 36) solid 5px;
  }
  .relations {
    grid-column-start: 2;
    grid-row-start: 3;
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
