<template>
    <div class="card">
      <div class="card-content">

        {{parseInt(selected.department_id)}}
        <p class="thin">{{$emit('get-company', selected.department_id)}}</p>
        <p class="name">{{selected.name}}<span class="age"> ({{$emit('get-age', selected.date_of_birth)}})</span></p>
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
</template>

<script>
export default {
  name: "Person",
  props: ["selected"],
  emits: ["get-company", "get-age"]
  // data: function() {
  //   return {
  //     connectBoxes: this.vModel
  //   }
  // }
}
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
</style>
