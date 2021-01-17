<template>

  <div :id="selected.name.replace(/\s/g, '').toLowerCase()">
  </div>
  <div :id="selected.name.replace(/\s/g, '').toLowerCase() + 'tooltip'" class="tooltip"></div>
  <div :id="selected.name.replace(/\s/g, '').toLowerCase() + 'vertical-line'" class="vertical-line"></div>
</template>

<script>
import {
  select,
  scaleLinear,
  scaleBand,
  axisBottom,
  axisLeft
} from 'd3'
let margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 500 - margin.left - margin.right,
    height = 140 - margin.top - margin.bottom;
export default {
  name: "ClevelandPlot",
  props: ['selected', 'xDomain'],
  data: function () {
    return {
      selectedUser: this.selected,
      domainX: this.xDomain
    }
  },
  mounted() {
    // append the svg object to the body of the page
    var svg = select("#" + this.selectedUser.name.replace(/\s/g, '').toLowerCase())
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    // Add X axis
    // console.log(this.selectedUser.name, this.xDomain);
    var x = scaleLinear()
      .domain(this.domainX)
      .range([ 0, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x))

    // Y axis
    var y = scaleBand()
      .range([ 0, height ])
      .domain([this.selected.name])
      .padding(1);

    svg.append("g")
    .attr('class', 'y-axis')
    .call(axisLeft(y))

    const lolly = svg.selectAll(".lolly")
      .data(this.selectedUser.school_history)
        .enter().append('g')
          .attr('class', 'lolly');
    // Add tooltip


    lolly.selectAll('.stick')
        .data(d => [d])
        .enter()
        .append("line")
          .attr('class', 'stick')
          .attr("x1", function(d) { return x(d.startDate); })
          .attr("x2", function(d) { return x(d.endDate); })
          .attr("y1",  y(this.selectedUser.name))
          .attr("y2", y(this.selectedUser.name))
          .attr("stroke", "#1FB52C")
          .attr("stroke-width", "5px")

    lolly.selectAll("circleOne")
      .data(d => [d])
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.startDate); })
        .attr("cy", y(this.selectedUser.name))
        .attr("r", "6")
        .style("fill", "#1FB52C")
        .on("mouseover", (event, d) => {

          select("#" + this.selected.name.replace(/\s/g, '').toLowerCase() + 'tooltip')
            .transition().duration(200).style('opacity', .9);

          select("#" + this.selected.name.replace(/\s/g, '').toLowerCase() + 'tooltip')
            .html(`${d.school}`)
            .style('left', `${event.pageX - 80}px`)
            .style('top', `${event.pageY - 40}px`);
        })
        .on('mouseout', () => {
          select("#" + this.selected.name.replace(/\s/g, '').toLowerCase() + 'tooltip').transition().duration(500).style('opacity', 0);

        });


    lolly.selectAll("circleTwo")
      .data(d => [d])
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.endDate); })
        .attr("cy", y(this.selectedUser.name))
        .attr("r", "6")
        .style("fill", "#1FB52C")

    lolly.selectAll("circleThree")
    .data(d => [d])
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.startDate + 1); })
    .attr("cy", y(this.selectedUser.name))
    .attr("r", "6")
    .style("fill", "#3CDBC4")
    .on("mouseover", (event) => {

      select("#" + this.selected.name.replace(/\s/g, '').toLowerCase() + 'vertical-line')
      .transition().duration(200).style('opacity', .9);

      console.log('d=', event.pageX, event.pageY);
      select("#" + this.selected.name.replace(/\s/g, '').toLowerCase() + 'vertical-line')
      .style('left', `${event.pageX }px`)
      .style('top', `${event.pageY }px`);
    })
    .on('mouseout', () => {
      select("#" + this.selected.name.replace(/\s/g, '').toLowerCase() + 'vertical-line').transition().duration(500).style('opacity', 0);

    });
  }
}
</script>

<style scoped>

</style>
