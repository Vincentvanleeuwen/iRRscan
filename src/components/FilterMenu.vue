<template>
  <section class="filter-menu">

    <section class="date-of-birth">
      <h4>Geboortejaar | {{ageRange[0]}} - {{ageRange[1]}}</h4>
      <Slider v-model="ageRange"
              :range="true"
              :min="ageRange[0] - 5"
              :max="ageRange[1] + 5"
              @change="$emit('get-age-range', ageRange)"/>
    </section>
<!--    <MultiCheckbox :name="'Functie'"-->
<!--                   :boxes="[ , 'Manager', 'Junior Employee' ]"-->
<!--                   :vModel="companyFunction"-->
<!--                   @change="$emit('get-company-function', companyFunction)"></MultiCheckbox>-->

    <section class="relation-types">
      <h4> Functie </h4>
      <div class="checkbox-container">
        <div class="p-field-checkbox">
          <Checkbox id="senior"
                    name="functions"
                    value="Senior Employee"
                    v-model="companyFunction"
                    @change="$emit('get-company-function', companyFunction)"/>
          <label for="senior">Senior Employee</label>
        </div>
        <div class="p-field-checkbox">
          <Checkbox id="manager"
                    name="functions"
                    value="Manager"
                    v-model="companyFunction"
                    @change="$emit('get-company-function', companyFunction)"/>
          <label for="manager">Manager</label>
        </div>
        <div class="p-field-checkbox">
          <Checkbox id="junior"
                    name="functions"
                    value="Junior Employee"
                    v-model="companyFunction"
                    @change="$emit('get-company-function', companyFunction)"/>
          <label for="junior">Junior Employee</label>
        </div>
      </div>
    </section>

    <section class="gender-container">
      <h4> Geslacht </h4>
      <div class="checkbox-container">
        <div class="p-field-checkbox">
          <Checkbox id="man"
                    name="sex"
                    value="Man"
                    v-model="sexCheckbox"
                    @change="$emit('get-sex', sexCheckbox)"/>
          <label for="man">Man</label>
        </div>
        <div class="p-field-checkbox">
          <Checkbox id="woman"
                    name="sex"
                    value="Vrouw"
                    v-model="sexCheckbox"
                    @change="$emit('get-sex', sexCheckbox)"/>
          <label for="woman">Vrouw</label>
        </div>
      </div>
    </section>
<!--    <MultiCheckbox :name="'Geslacht'"-->
<!--                   :boxes="['Man', 'Vrouw']"-->
<!--                   :vModel="sexCheckbox"></MultiCheckbox>-->



    <section class="legenda">
      <h4> Legenda </h4>
      <div class="legend-container">
        <div class="legend-option">
          <div class="box"></div>
          Werk
        </div>
        <div class="legend-option">
          <div class="box"></div>
          Familie
        </div>
        <div class="legend-option">
          <div class="box"></div>
          School
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Slider from "primevue/slider";
import Checkbox from 'primevue/checkbox';
export default {
  name: "FilterMenu",
  components: {
    Slider,
    Checkbox
  },
  props: ["types", "age", "functionInCompany", "sex", "selected", "departments"],
  emits: ["get-age-range", "get-company-function", "get-sex"],
  data: function () {
    return {
      relationTypes: this.types,
      ageRange: this.age,
      companyFunction: this.functionInCompany,
      sexCheckbox: this.sex,
      selectedCompanies: this.selected,
      companies: this.departments,
    }
  },
  updated() {
    console.log(this.ageRange)
    console.log(this.companyFunction)

  },

  watch:{
    age: function(newVal, oldVal){
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)

    }
  }
}
</script>

<style scoped>
  h4 {
    text-align: left;
    font-size: .8em;
  }

  .date-of-birth {
    width: 80%;
  }
  .legend-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .legend-option {
    width: 50%;
    height: 2em;
  }
  .relation-types {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .checkbox-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 350px;
  }
  .p-field-checkbox {
    width: 50%;
  }
  .relation-types h4 {

    margin-top: 2em;
  }
</style>
