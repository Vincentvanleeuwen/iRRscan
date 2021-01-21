<template>
  <section class="filter-menu">

    <section class="date-of-birth">
      <h4>Geboortejaar | {{ageRange[0]}} - {{ageRange[1]}}</h4>
      <Slider v-model="ageRange"
              :range="true"
              :min="1900"
              :max="2021"
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
      <div class="divider"></div>
    </section>



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
      <section class="">
        <div class="lolly-legend">
          <div style="margin-right: .5em;">
            <div class="lolly-circle-legend"></div>
            <div class="lolly-stick-legend"></div>
            <div class="lolly-circle-legend"></div>
          </div>
          Aantal jaren op school
        </div>
        <div class="vertical-lolly-legend">
          <div>
            <div class="lolly-circle-legend"></div>
            <div class="vertical-stick-legend"></div>
          </div>
          Begin relatie
        </div>

        <div class="tooltip-legend">
          <div class="tooltip"></div>
          School uitgelicht persoon
        </div>
        <div class="tooltip-legend">
          <div class="tooltip"></div>
          Niet gemeenschappelijke school
        </div>
      </section>
      <div class="divider"></div>
    </section>
    <section class="trashbin">
      <i class="pi pi-trash" style="fontSize: 1.2rem"></i>
      Prullenbak
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
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
  .legenda {
    min-width: 350px;
  }
  .divider{
    border-bottom: solid 2px #000;
    width:75%;
  }
  .legenda .divider {
    margin-top: 1.5em;
  }
  .legend-option .box{
    height: .5em;
    width:20%;
    background-color:#58838B;
    margin-right: .5em;
  }
  .legend-option:first-of-type .box{
    background-color: #7BC4AF;
  }
  .legend-option:last-of-type .box {
    background-color: #FC9F55;
  }

  .lolly-circle-legend {
    width: .7em;
    height: .7em;
    border-radius: 50%;
    background-color: rgb(31, 181, 44);
  }
  .lolly-stick-legend {
    width: .7em;
    height: .2em;
    background-color: rgb(31, 181, 44);
  }
  .lolly-legend {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1em 0 1.5em;
  }
  .lolly-legend div  {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .vertical-lolly-legend {
    display: flex;
    flex-direction: row;
    margin: 1em 0;
  }
  .vertical-stick-legend {
    width: .2em;
    height: .5em;
    background-color: rgb(60, 219, 196);
  }
  .vertical-lolly-legend div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1.2em;
  }
  .vertical-lolly-legend .lolly-circle-legend {
    background-color: rgb(60, 219, 196);
  }
  .tooltip-legend {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .tooltip-legend .tooltip {
    position: relative;
    text-align: center;

    height: 2em;
    width: 3em;
    padding: 1em 1em;
    font: 12px sans-serif;
    background: #299EFD;
    border: 0;
    border-radius: 2px;
    color:white;
    font-weight: bold;
    padding-top:.5em;
    pointer-events: none;
    opacity: 1;
    margin: 1em 1em .5em 0
  }
  .tooltip-legend:last-of-type .tooltip {
    background-color: #909090;
  }
  .trashbin {
    margin-top: 2em;
    display: flex;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
  }
  .trashbin i {
    margin-right: 1.2em;
  }
</style>
