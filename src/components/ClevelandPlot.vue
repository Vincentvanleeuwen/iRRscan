<template>

  <div id="cleveland-plot">
  </div>

</template>

<script>
import {
  select,
  // max,
  scaleLinear,
  // scaleBand,
  axisBottom,
  // axisLeft
} from 'd3'
var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 500 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
export default {
  name: "ClevelandPlot",
  setup() {
    // append the svg object to the body of the page
    var svg = select("#cleveland-plot")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    // Add X axis
    var x = scaleLinear()
    .domain([1950, 2021])
    .range([ 0, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x))

  //   svg.selectAll("circleOne")
  //     .data(data)
  //     .enter()
  //     .append("circle")
  //       .attr("cx", function(d) { return x(d.value1); })
  //       .attr("cy", function(d) { return y(d.group); })
  //       .attr("r", "6")
  //       .style("fill", "#69b3a2")
  }
}
</script>

<style scoped>

</style>
