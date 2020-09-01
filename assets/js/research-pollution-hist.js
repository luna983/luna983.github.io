// transition functions
function showRpt(bar, delay, duration) {
  bar.transition()
     .delay(delay)
     .duration(duration)
     .attr("y", function(d) { return yScale(d.rpt); })
     .attr("height", function(d) { return inner_height - yScale(d.rpt); });
  d3.selectAll('.ann_bar')
    .transition()
    .delay(delay + duration)
    .style("opacity", 1);
  d3.selectAll('.ann_text')
    .transition()
    .delay(delay + duration)
    .style("opacity", 1);
  d3.select("#research-pollution-hist-nav")
    .select('td#rpt')
    .transition()
    .delay(delay)
    .style("opacity", 1);
  d3.select("#research-pollution-hist-nav")
    .select('td#sat')
    .transition()
    .delay(delay)
    .style("opacity", 0.5);
};

function showSat(bar, delay, duration) {
  d3.selectAll('.ann_bar')
    .transition()
    .delay(delay)
    .style("opacity", 0);
  d3.selectAll('.ann_text')
    .transition()
    .delay(delay)
    .style("opacity", 0);
  bar.transition()
     .delay(delay)
     .duration(duration)
     .attr("y", function(d) { return yScale(d.sat); })
     .attr("height", function(d) { return inner_height - yScale(d.sat); });
  d3.select("#research-pollution-hist-nav")
    .select('td#rpt')
    .transition()
    .delay(delay)
    .style("opacity", 0.5);
  d3.select("#research-pollution-hist-nav")
    .select('td#sat')
    .transition()
    .delay(delay)
    .style("opacity", 1);
};

// specify size and margin
var width = 400;
var height = 200;
var margin = {top: 0, right: 10, bottom: 20, left: 10};
var inner_height = height - margin.top - margin.bottom;
var inner_width = width - margin.left - margin.right;

// histogram bandwidth + padding
var bandwidth = 5;
var padding = 0.2;

// specify interactive transition speed
var delay = 1000;
var duration = 1500;

// specify color palette
var ann_color = "#800000";

// annotation
var ann_x = 97.5;
var ann_rpt = 0.0863;
var ann_x_offset = 8;
var ann_text = "Abnormal discontinuity at 100";

// initialize the SVG
var svg = d3.select("#research-pollution-hist")
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

// set x, y axis ranges
var xScale = d3.scaleLinear()
               .domain([0, 200])
               .range([0, inner_width]);
var yScale = d3.scaleLinear()
               .domain([0, 0.13])
               .range([inner_height, 0]);

// add the x axis
svg.append("g")
   .attr("transform", "translate(0," + inner_height + ")")
   .call(d3.axisBottom(xScale));

// get the data
d3.csv("/assets/data/research-pollution-hist/hist.csv").then(function(data) {

  // append the rectangles for the bar chart
  var bar = svg.selectAll(".bar")
               .data(data)
               .enter().append("rect");
  bar.attr("class", "bar")
     .attr("x", function(d) { return xScale(d.x - bandwidth / 2 + padding); })
     .attr("width", xScale(bandwidth - padding * 2) - xScale(0))
     .attr("y", inner_height)
     .attr("height", 0);
  
  // annotation
  var ann_bar = svg.append("rect");
  ann_bar.attr("class", "ann_bar")
         .attr("x", xScale(ann_x - bandwidth / 2 + padding))
         .attr("width", xScale(bandwidth - padding * 2) - xScale(0))
         .attr("y", yScale(ann_rpt))
         .attr("height", inner_height - yScale(ann_rpt))
         .attr("fill", ann_color)
         .attr("opacity", 0);
  var ann = svg.append("text")
               .text(ann_text);
  ann.attr("class", "ann_text")
     .attr("x", xScale(ann_x - bandwidth / 2 + padding + ann_x_offset))
     .attr("y", yScale(ann_rpt))
     .attr("fill", ann_color)
     .attr("font-size", 12)
     .attr("opacity", 0);

  // define interaction, bind function to buttons
  d3.select("#research-pollution-hist-nav")
    .select('td#rpt')
    .on('click', function() {showRpt(bar, 0, duration)});
  d3.select("#research-pollution-hist-nav")
    .select('td#sat')
    .on('click', function() {showSat(bar, 0, duration)});

  // transition begins
  showRpt(bar, 0, duration);
  showSat(bar, delay * 4, duration);

});
