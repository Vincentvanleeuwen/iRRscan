<template>
  <Nav class="navigation" :networkHome="networkHome"
       :networkItems="networkItems"
       :get-person="getNewPerson"/>
  <FilterMenu :types="relationTypes"
              :age="ageRange"
              v-on:get-age-range="getAgeRange"
              :functionInCompany="companyFunction"
              v-on:get-company-function="getCompanyFunction"
              v-on:get-sex="getSex"
              :sex="sexCheckbox"
              :selected="selectedCompanies"
              :departments="getData.departments"/>

  <section class="network">
    <div class="results" v-if="filterPeople(relatedPeople, ageRange, companyFunction, sexCheckbox).length < 1">
      Geen resultaten.
    </div>
    <div class="results" v-else>
      {{ filterPeople(relatedPeople, ageRange, companyFunction, sexCheckbox).length}} gevonden resultaten.
    </div>
    <Person v-on:get-company="getCompany"
            v-on:get-age="getAge"
            :selected="selected"
            :xDomain="xDomain"/>

  </section>
  <section class="relations p-d-flex p-flex-column">

    <Person v-for="relation in filterPeople(relatedPeople, ageRange, companyFunction, sexCheckbox)"
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
    },
    home: {
      type: Object
    },
    items: {
      type: Array
    }
  },
  emits: ["getNewPerson", "add-related"],
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
      xDomain: [1950, 2021],
      companyFunction: ["Senior Employee", "Junior Employee", "Manager"],
      sexCheckbox: ["Man", "Vrouw"],
      selectedCompanies: null,
      networkHome: this.home,
      networkItems: this.items,

    }
  },
  beforeMount() {

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

    // HIER ZIT HET PROBLEEM
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
    filterPeople(relatedPeople, ageRange, companyFunction, sex) {
      console.log('companyfunction=', companyFunction);

      let filteredByBirthDate = relatedPeople.filter(person => {
        return parseInt(person.date_of_birth.slice(0, 4)) > ageRange[0]
            && parseInt(person.date_of_birth.slice(0, 4)) < ageRange[1]
      })
      let filteredByFunction = filteredByBirthDate.filter(person => {
        let getPosition = null;
        switch (person.position) {
          case "YOUNG_FEMALE_EMPLOYEE" || "YOUNG_MALE_EMPLOYEE":
            getPosition = "Junior Employee"
            break;
          case "SEN_FEMALE_EMPLOYEE" || "SEN_MALE_EMPLOYEE":
            getPosition = "Senior Employee"
            break;
          case "MANAGER":
            getPosition = "Manager"
            break;
        }
        console.log('CompanyThing', companyFunction.includes(getPosition));
        if(companyFunction.includes(getPosition)){
          getPosition = null;
          return person
        }
      })

      let filteredBySex = filteredByFunction.filter(person => {
        let getSex = null;
        switch (person.sex) {
          case "FEMALE":
            getSex = "VROUW"
            break;
          case "MALE":
            getSex = "MAN"
            break;
        }
        if(sex.map(name => name.toUpperCase()).includes(getSex)){
          getSex = null;
          return person
        }
      })
      console.log('ByBirthDate', filteredByBirthDate);
      console.log('ByFunction', filteredByFunction);
      console.log('BySex', filteredBySex);
      return filteredBySex;

    },
    getAgeRange(ageRange) {
      this.ageRange = ageRange;
    },
    getCompanyFunction(companyFunction) {
      console.log('HEY!')
      this.companyFunction = companyFunction;
    },
    getSex(sex) {
      this.sexCheckbox = sex;
    },
    addRelatedPeople(bsn) {
      let newRelation = this.getData.people.find(person => person.node_id === parseInt(bsn));
      if(newRelation) {
        this.relatedPeople.push(newRelation)
      }
      newRelation = null;
    },
    getRelationsToSelected(id) {
      // console.log(this.selected, id)
      let relationTypes = [];
      this.selected.relations.forEach(relation => {
        if(relation[1] === id){
          if(relation[2] === "EMPLOYEE2MANAGER"
              || relation[2] === "MANAGER2EMPLOYEE"
              || relation[2] === "REL1") {
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
    background-color: white;
    position: fixed;
    top: 200px;
    left: 410px;
    width: 100%;
  }
  .network .person {
    background-color: rgb(247 247 247);;
    padding: 0 1em;
    display: flex;
    align-items: center;
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
    grid-row-start: 4;
    justify-content: flex-start;
    align-items: flex-start;

    overflow-y: scroll;
    height: 28em;
  }
  /* width */
  .relations::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  .relations::-webkit-scrollbar-track {
    background-color: #e0e0e0;
    border-radius: 10px;
  }

  /* Handle */
  .relations::-webkit-scrollbar-thumb {
    background: #909090;
    border-radius: 10px;
    width: 5px;
  }

  /* Handle on hover */
  .relations::-webkit-scrollbar-thumb:hover {
    background: #1F1F1E;
  }
  .filter-menu {
    padding-left: 6em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    margin-bottom: 5em;
    grid-column-start: 1;
    grid-row-start: 3;
  }
  .function, .sex, .relation-types, .companies {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .results {
    font-weight: bold;
    font-size: .8em;
    text-align: left;
    margin-bottom: 1em;
  }
</style>
