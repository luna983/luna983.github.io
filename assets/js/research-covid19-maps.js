function showN(circle, delay, duration, rscale) {
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

function showP(circle, delay, duration, rscale) {
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
var coord_centers = [[-96, 37], [104, 35], [2, 46], [12, 41], [127, 35], [53, 32]];
// specify the projection scale
var proj_scales = [800, 800, 800, 800, 800, 800];

// loop over countries
for (var i = 0; i < 1; i++) {
  console.log("country: " + countries[i])
  console.log("rscale: " + rscales[i])
  console.log("coord_center: " + coord_centers[i])
  console.log("proj_scale: " + proj_scales[i])

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

  // load data
  var path_data = d3.json(
    "/assets/data/research-covid19-maps/" + countries[i] + ".geojson");
  var circle_data = d3.csv(
    "/assets/data/research-covid19-maps/" + countries[i] + ".csv");

  Promise.all([path_data, circle_data]).then(function(data) {
    // draw map
    svg.selectAll("path")
       .data(data[0].features)
       .enter().append("path")
       .attr("d", path)
       .attr("fill", "#fff")
       .attr("stroke", "#777")
       .attr("stroke-width", 2);
    // draw circles
    var circle = svg.selectAll("circle")
                    .data(data[1])
                    .enter().append("circle");
    circle.attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
          .attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
          .attr("r", function(d) {return Math.sqrt(d.p) * rscales[i];})
          .attr("fill", circle_color)
          .attr("opacity", 0.3);
    return circle;
  }).then(function(circle) {
    // transition
    showN(circle, delay, duration, rscales[i]);
    return circle;
  }).then(function(circle) {
    // define interaction
    d3.select(nav_id)
      .select('td#n')
      .on('click', function() {showN(circle, 0, duration, rscales[i])});
    d3.select(nav_id)
      .select('td#p')
      .on('click', function() {showP(circle, 0, duration, rscales[i])});
  });
};