<template>
  <Nav class="navigation"/>
  <FilterMenu :types="relationTypes"
              :age="ageRange"
              :function="companyFunction"
              :sex="sexCheckbox"
              :selected="selectedCompanies"
              :departments="getData.departments"/>

  <section class="network">
    <Person v-on:get-company="getCompany"
            v-on:get-age="getAge"
            :selected="selected"
            :xDomain="xDomain"/>

  </section>
  <section class="relations p-d-flex p-flex-column">
    <Person v-for="relation in relatedPeople"
            v-bind:key="relation.id"
            v-on:get-company="getCompany"
            v-on:get-age="getAge"
            v-on:get-relations="getRelationsToSelected"
            :selected="relation"
            :xDomain="xDomain"/>
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
      xDomain: [],
      companyFunction: ["Manager", "Senior Employee", "Junior Employee"],
      sexCheckbox: ["Man", "Vrouw"],
      selectedCompanies: null
    }
  },
  mounted() {
    let dates = [];
    let schoolStartDates = [];
    let schoolEndDates = [];

    // Add all related people in a separate Array
    this.selected.relations.forEach(relation => {
      return this.addRelatedPeople(relation[1]);
    });

    this.relatedPeople.forEach(person => {
      dates.push(parseInt(person.date_of_birth.slice(0, 4)))
      person.school_history.forEach(school => {
        schoolStartDates.push(school.startDate)
        schoolEndDates.push(school.endDate)
      })
    })

    this.ageRange = [Math.min(...dates), Math.max(...dates)]
    this.xDomain = [Math.min(...schoolStartDates) -5, Math.max(...schoolEndDates) +5]
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
    getAge(birthDate) {

      var today = new Date();
      var dateOfBirth = new Date(birthDate);
      var age = today.getFullYear() - dateOfBirth.getFullYear();
      var m = today.getMonth() - dateOfBirth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
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
    },
    getRelationsToSelected(id) {
      console.log(this.selected, id)
      let relationTypes = [];
      this.selected.relations.forEach(relation => {
        console.log(relation[1])
        if(relation[1] === id){
          console.log(relation[2])
          if(relation[2] === "EMPLOYEE2MANAGER"
              || "MANAGER2EMPLOYEE"
              || "REL1") {
            relationTypes.push("work")
          } else if (relation[2] === "REL2") {
            relationTypes.push("school")
          } else if(relation[2] === "REL4") {
            relationTypes.push("family")
          }

        }
      })
      console.log(relationTypes)
      return relationTypes;
    }
  }
};
</script>
<style scoped>
  .network {
    grid-column-start: 2;
    grid-row-start: 2;
    background-color: white;
    position: fixed;
    top: 190px;
    left:300px;
  }
  .network .person {
    border: rgb(208, 116, 36) solid 2px;

  }
  .navigation {
    grid-column-start: 2;
    grid-row-start: 1;
    background-color: #fff;
    position: fixed;
    top: 0;
    height: 200px;
    width: 100%;

  }
  .relations {
    grid-column-start: 2;
    grid-row-start: 3;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 2em;
  }
  .filter-menu {
    padding-left: 2em;
    grid-column-start: 1;
    grid-row-start: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;

    height: 100%;
    margin-bottom: 5em;
    top:200px;
    bottom:0;
    left: 0;
  }
  .function, .sex, .relation-types, .companies {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

</style>
