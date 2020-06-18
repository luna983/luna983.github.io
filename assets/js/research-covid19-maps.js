// transition functions
function showN(circle, delay, duration, rscale, nav_id) {
  circle.transition()
        .delay(delay)
        .duration(duration)
        .attr("r", function(d) {return Math.sqrt(d.n) * rscale;});
  d3.select(nav_id)
    .select('td#n')
    .transition()
    .delay(delay)
    .style("opacity", 1);
  d3.select(nav_id)
    .select('td#p')
    .transition()
    .delay(delay)
    .style("opacity", 0.5);
};

function showP(circle, delay, duration, rscale, nav_id) {
  circle.transition()
        .delay(delay)
        .duration(duration)
        .attr("r", function(d) {return Math.sqrt(d.p) * rscale;});
  d3.select(nav_id)
    .select('td#n')
    .transition()
    .delay(delay)
    .style("opacity", 0.5);
  d3.select(nav_id)
    .select('td#p')
    .transition()
    .delay(delay)
    .style("opacity", 1);
};

async function load(i) {
  // specify where to add SVG
  var svg_id = "div#research-covid19-maps-" + countries[i];
  var nav_id = "div#research-covid19-nav-" + countries[i];

  // initialize the SVG
  var svg = d3.select(svg_id)
              .append("svg")
              // position the graph appropriately
              .attr("preserveAspectRatio", "xMinYMin meet")
              // dynamically adjust box size
              .attr("viewBox", "0 0 " + width + " " + height)
              .classed("svg-content", true);

  // projection
  var projection = d3.geoMercator()  // specify crs
                     .center(coord_centers[i])  // specify coordinate center
                     .scale(proj_scales[i])  // specify scale
                     .translate([width / 2, height / 2]);  // center
  // path generator
  var path = d3.geoPath().projection(projection);

  // define interaction
  d3.select(nav_id)
    .select('td#n')
    .on('click', function() {showN(circle, 0, duration, rscales[i], nav_id)});
  d3.select(nav_id)
    .select('td#p')
    .on('click', function() {showP(circle, 0, duration, rscales[i], nav_id)});

  // load data
  let path_data = await d3.json(
    "/assets/data/research-covid19-maps/" + countries[i] + ".geojson");
  let circle_data = await d3.csv(
    "/assets/data/research-covid19-maps/" + countries[i] + ".csv");

  // draw map
  svg.selectAll("path")
     .data(path_data.features)
     .enter().append("path")
     .attr("d", path)
     .attr("fill", "#fff")
     .attr("stroke", "#777")
     .attr("stroke-width", 2);

  // draw circles
  var circle = svg.selectAll("circle")
                  .data(circle_data)
                  .enter().append("circle");
  circle.attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
        .attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
        .attr("r", function(d) {return Math.sqrt(d.p) * rscales[i];})
        .attr("fill", circle_color)
        .attr("opacity", 0.3);

  // transition
  if (i == 0) {
    showN(circle, delay, duration, rscales[i], nav_id);
  }
};

// **** constant for all countries ****

// specify size
var width = 900;
var height = 500;

// specify interactive transition speed
var delay = 1500;
var duration = 3000;

// specify color palette
var circle_color = "#800000";

// **** country specific params ****

// specify country
var countries = ["USA", "CHN", "FRA", "ITA", "KOR", "IRN"];
// specify legend size
var rscales = [0.2, 0.2, 0.2, 0.2, 0.2, 0.2];
// specify the coordinate center
var coord_centers = [[-96, 37], [104, 36], [2, 46.5], [12, 41.5], [127, 36], [53, 32]];
// specify the projection scale
var proj_scales = [800, 550, 1900, 1700, 3800, 1400];

// **** loop over countries ****
for (var i = 0; i < 6; i++) {
  load(i);
};
