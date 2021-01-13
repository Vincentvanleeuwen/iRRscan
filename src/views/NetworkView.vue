<template>
  <section class="filter-menu">
    <section class="relation-types">
      <h4>Relatie types</h4>
      <div class="p-field-checkbox">
        <Checkbox id="family" name="family" value="Familie" v-model="relationTypes" />
        <label for="family">Familie</label>
      </div>
      <div class="p-field-checkbox">
        <Checkbox id="work" name="work" value="Werk" v-model="relationTypes" />
        <label for="work">Werk</label>
      </div>
      <div class="p-field-checkbox">
        <Checkbox id="school" name="school" value="School" v-model="relationTypes" />
        <label for="school">School</label>
      </div>
    </section>

<!--    <MultiCheckbox :name="'Relatie types'"-->
<!--                   :boxes="['Familie', 'Werk', 'School']"-->
<!--                   :vModel="relationTypes"></MultiCheckbox>-->

    <section class="date-of-birth">
      <h4>Geboortejaar | {{ageRange[0]}} - {{ageRange[1]}}</h4>
      <Slider v-model="ageRange" :range="true" :min="1900" :max="2021"/>
    </section>
<!--    <MultiCheckbox :name="'Functie'"-->
<!--                   :boxes="['Manager', 'Senior Employee', 'Junior Employee']"-->
<!--                   :vModel="companyFunction"></MultiCheckbox>-->
    <section class="function">
      <h4>Functie</h4>
      <div class="p-field-checkbox">
        <Checkbox id="manager" name="manager" value="Manager" v-model="companyFunction" />
        <label for="manager">Manager</label>
      </div>
      <div class="p-field-checkbox">
        <Checkbox id="senior" name="senior" value="Senior Employee" v-model="companyFunction" />
        <label for="senior">Senior Employee</label>
      </div>
      <div class="p-field-checkbox">
        <Checkbox id="junior" name="junior" value="Junior Employee" v-model="companyFunction" />
        <label for="junior">Junior Employee</label>
      </div>
    </section>
<!--    <MultiCheckbox :name="'Geslacht'"-->
<!--                   :boxes="['Man', 'Vrouw']"-->
<!--                   :vModel="sexCheckbox"></MultiCheckbox>-->
    <section class="sex">
      <h4>Geslacht</h4>
      <div class="p-field-checkbox">
        <Checkbox id="man" name="man" value="Man" v-model="sexCheckbox" />
        <label for="man">Man</label>
      </div>
      <div class="p-field-checkbox">
        <Checkbox id="woman" name="woman" value="Vrouw" v-model="sexCheckbox" />
        <label for="woman">Vrouw</label>
      </div>
    </section>

    <MultiSelect v-model="selectedCompanies"
                 :options="getData.departments"
                 optionLabel="name"
                 placeholder="Select Company"
                 :filter="true"
                 display="chip"
                 class="multiselect-custom">
      <template #value="slotProps">
        <div class="country-item country-item-value" v-for="option of slotProps.value" :key="option.department_id">
          <div>{{option.name}}</div>
        </div>
        <template v-if="!slotProps.value || slotProps.value.length === 0">
          Select Countries
        </template>
      </template>
      <template #option="slotProps">
        <div class="country-item">
          <div>{{slotProps.option.name}}</div>
        </div>
      </template>
    </MultiSelect>
  </section>


  <section class="network">
    <div class="card">
      <div class="card-content">
        <p class="thin">{{getCompany(selected.department_id)}}</p>
        <p class="name">{{selected.name}}<span class="age"> ({{getAge(selected.date_of_birth)}})</span></p>
        <p class="thin">{{selected.position}}</p>
        <p class="smoll"> BSN: {{selected.node_id}}</p>
        <div class="circle"></div>
      </div>
      <div class="gender">
        <div class="extra-width">
          <img :src="require(`@/assets/img/${selected.sex}.png`)" :alt="selected.sex">
        </div>

      </div>
    </div>
  </section>
  <section class="relations p-d-flex p-flex-wrap">
    <div class="card" v-for="relation in relatedPeople" v-bind:key="relation.id">
      <div class="card-content">
        <p class="thin">{{getCompany(relation.department_id)}}</p>
        <p class="name">{{relation.name}}<span class="age"> ({{getAge(relation.date_of_birth)}})</span></p>
        <p class="thin">{{relation.position}}</p>
        <p class="smoll"> BSN: {{relation.node_id}}</p>
        <div class="circle"></div>
      </div>
      <div class="gender">
        <div class="extra-width">
          <img :src="require(`@/assets/img/${relation.sex}.png`)" :alt="relation.sex">
        </div>

      </div>
    </div>
  </section>

<!--  <div v-for="person in getData.people"-->
<!--       v-bind:key="person.id">-->
<!--      {{ person.name}}-->
<!--  </div>-->

</template>

<script>
import Checkbox from 'primevue/checkbox';
import Slider from 'primevue/slider';
import MultiSelect from 'primevue/multiselect';
import MultiCheckbox from "@/components/MultiCheckbox";
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
  components: {
    Checkbox,
    Slider,
    MultiSelect,
    MultiCheckbox
  },
  data: function() {
    return {
      relatedPeople: this.related,
      relationTypes: [],
      ageRange: [1950, 2021],
      companyFunction: [],
      sexCheckbox: [],
      selectedCompanies: null
    }
  },
  mounted() {
    // Add all related people in a seperate Array
    this.selected.relations.forEach(relation => {
      return this.addRelatedPeople(relation[1]);
    })
  },
  methods: {
    getCompany(id) {
      return(this.getData.departments.find(department => department.id === id) ?
      this.getData.departments.find(department => department.id === id).name : "No Company Found");
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
      console.log(newRelation)
      if(newRelation) {
        this.relatedPeople.push(newRelation)
      }
      newRelation = null;
      console.log('relatedppl=', this.relatedPeople);
    }
  }
};
</script>
<style scoped>
  .card {
    background-color: #1F1F1E;
    width: 22em;
    height: 10em;
    border-radius: 1em;
    margin:1em auto;
    display: flex;
    align-items: center;
    color: #1F1F1E;
    position: relative;
    overflow: hidden;
  }
  .card-content {
    display:flex;
    flex-direction: column;
  }
  .card-content p {
    text-align: left;
    padding-left: 1em;
    margin:.2em;
    z-index: 2;

  }

  .gender {
    background-color: #1F1F1E;
    height:100%;
    width: 10em;
    margin-left: 2em;
    border-bottom-right-radius: 8%;
    border-top-right-radius: 8%;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .gender img {
    width: 4em;
    margin-top: .3em;
  }

  .circle {
    border-radius:50%;
    width:25em;
    height:25em;
    position: absolute;
    left: -12em;
    top:-8em;
    background-color: #E4E4E4;
    z-index: 1;
  }
  .extra-width {
    width: 5em;
    height: 5em;
    border-radius:50%;
    background-color: #E4E4E4;
  }
  .thin {
    font-family: AvenirNext-UltraLight, sans-serif;
    font-size: .7em;
    margin-left: 0.7em!important;

  }
  .smoll {
    font-size: .7em;
    margin-left: 0.7em!important;
    margin-top: 1em!important;
    font-family: AvenirNext-Bold, sans-serif;
  }
  .age {
    font-family: AvenirNext-UltraLight, sans-serif;
    font-size: .8em;
  }
  .network {
    grid-column-start: 2;
    grid-row-start: 1;
  }
  .relations {
    grid-column-start: 2;
    grid-row-start: 2;
  }
  .filter-menu {
    padding-left: 2em;
    grid-column-start: 1;
    grid-row-start: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .function, .sex, .relation-types {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>
