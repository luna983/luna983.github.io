// transition functions
function showBF(delay, duration) {
  yScale.domain([-5, 55]).ticks(5);
  svg.select("#yAxis")
     .transition()
     .delay(delay)
     .duration(duration)
     .call(d3.axisLeft(yScale));
  svg.selectAll(".main_circle")
     .transition()
     .delay(delay)
     .duration(duration)
     .attr("cy", function(d) { return yScale(+d.bf_beta); });
  svg.selectAll(".main_errorbar")
     .transition()
     .delay(delay)
     .duration(duration)
     .attr("y1", function(d) { return yScale((+d.bf_beta) + 1.96 * (+d.bf_se)); })
     .attr("y2", function(d) { return yScale((+d.bf_beta) - 1.96 * (+d.bf_se)); });
  var line = d3.line()
               .x(function(d) { return xScale(+d.x) + xScale.bandwidth() / 2; })
               .y(function(d) { return yScale(+d.bf_beta); });
  svg.selectAll(".main_line")
     .transition()
     .delay(delay)
     .duration(duration)
     .attr("d", line);
  d3.select("#research-jmp-ate-ylabel")
     .text("Building Footprint (in square meters)");
  d3.select("#research-jmp-ate-nav")
    .select('td#bf')
    .transition()
    .delay(delay)
    .style("opacity", 1);
  d3.select("#research-jmp-ate-nav")
    .select('td#rf')
    .transition()
    .delay(delay)
    .style("opacity", 0.5);
};
  
function showRF(delay, duration) {
  yScale.domain([0, 0.2]).ticks(5);
  svg.select("#yAxis")
     .transition()
     .delay(delay)
     .duration(duration)
     .call(d3.axisLeft(yScale));
  svg.selectAll(".main_circle")
     .transition()
     .delay(delay)
     .duration(duration)
     .attr("cy", function(d) { return yScale(+d.rf_beta); });
  svg.selectAll(".main_errorbar")
     .transition()
     .delay(delay)
     .duration(duration)
     .attr("y1", function(d) { return yScale((+d.rf_beta) + 1.96 * (+d.rf_se)); })
     .attr("y2", function(d) { return yScale((+d.rf_beta) - 1.96 * (+d.rf_se)); });
  var line = d3.line()
               .x(function(d) { return xScale(+d.x) + xScale.bandwidth() / 2; })
               .y(function(d) { return yScale(+d.rf_beta); });
  svg.selectAll(".main_line")
     .transition()
     .delay(delay)
     .duration(duration)
     .attr("d", line);
  d3.select("#research-jmp-ate-ylabel")
    .text("Normalized Roof Reflectance (in Std. Dev. units)");
  d3.select("#research-jmp-ate-nav")
    .select('td#bf')
    .transition()
    .delay(delay)
    .style("opacity", 0.5);
  d3.select("#research-jmp-ate-nav")
    .select('td#rf')
    .transition()
    .delay(delay)
    .style("opacity", 1);
};

// specify size and margin
var width = 400;
var height = 200;
var margin = {top: 5, right: 0, bottom: 40, left: 35};
var inner_height = height - margin.top - margin.bottom;
var inner_width = width - margin.left - margin.right;

// specify interactive transition speed
var delay = 1000;
var duration = 1500;

// specify color palette
var main_color = "#800000";

// initialize the SVG
var svg = d3.select("#research-jmp-ate")
            .append("svg")
            // position the graph appropriately
            .attr("preserveAspectRatio", "xMinYMin meet")
            // dynamically adjust box size
            .attr("viewBox", "0 0 " + width + " " + height)
            .classed("svg-content", true)
            // leave some space on the margin for axes
            .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

// set x, y axis
const xTicks = {0: "$0", 1: "$1000", 2: "$2000", 3: "$3000+"};
var xScale = d3.scaleBand()
               .domain([0, 1, 2, 3])
               .range([0, inner_width]);
var xAxis = d3.axisBottom(xScale).tickFormat(function(x) { return xTicks[x]; });
var yScale = d3.scaleLinear()
               .range([inner_height, 0]);
var xLabel = "Cash Infusion Intensity (USD)";

// add the x axis
svg.append("g")
   .attr("transform", "translate(0," + inner_height + ")")
   .call(xAxis);
svg.append("text")
   .text(xLabel)
   .style("text-anchor", "middle")
   .attr("x", inner_width / 2)
   .attr("y", margin.top + inner_height + margin.bottom * 0.7)
   .attr("fill", "#777")
   .attr("font-size", 12);
// add the y axis
svg.append("g")
   .attr("id", "yAxis");

// define interaction, bind function to buttons
d3.select("#research-jmp-ate-nav")
  .select('td#bf')
  .on('click', function() {showBF(0, duration)});
d3.select("#research-jmp-ate-nav")
  .select('td#rf')
  .on('click', function() {showRF(0, duration)});

// get the data
d3.csv("/assets/data/research-jmp-ate/main.csv").then(function(data) {

  // main_circle - point estimates
  svg.selectAll(".main_circle")
     .data(data)
     .enter().append("circle")
     .attr("class", "main_circle")
     .attr("fill", main_color)
     .attr("cx", function(d) { return xScale(+d.x) + xScale.bandwidth() / 2; })
     .attr("cy", yScale(0))
     .attr("r", 4);

  // main_errorbar - 95% confidence intervals
  svg.selectAll(".main_errorbar")
     .data(data)
     .enter().append("line")
     .attr("class", "main_errorbar")
     .attr("fill", "none")
     .attr("stroke", main_color)
     .attr("stroke-width", 2)
     .attr("x1", function(d) { return xScale(+d.x) + xScale.bandwidth() / 2; })
     .attr("x2", function(d) { return xScale(+d.x) + xScale.bandwidth() / 2; })
     .attr("y1", yScale(0))
     .attr("y2", yScale(0));

  // line connecting the dots
  var line = d3.line()
               .x(function(d) { return xScale(+d.x) + xScale.bandwidth() / 2; })
               .y(yScale(0));
  svg.append("path")
     .datum(data)
     .attr("class", "main_line")
     .attr("fill", "none")
     .attr("stroke", main_color)
     .attr("stroke-width", 2)
     .attr("d", line);

  // transition begins
  showRF(0, 0);

});