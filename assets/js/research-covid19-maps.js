// specify where to add SVG
var svg_id = "div#research-covid19-maps";

// specify size
var width = 900;
var height = 500;

// specify legend size
var rscale = 0.001;

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
				           .center([-96, 37])  // specify coordinate center
				           .scale([800])  // specify scale
				           .translate([width / 2, height / 2]);  // center
// path generator
var path = d3.geoPath().projection(projection);

// load data
var geoms = d3.json("/assets/data/research-covid19-maps/USA.geojson");
var circles = d3.csv("/assets/data/research-covid19-maps/USA.csv");

Promise.all([geoms, circles]).then(function(data) {    
  // draw map
  svg.selectAll("path")
     .data(data[0].features)
     .enter()
     .append("path")
     .attr("class", "adm-geom")
     .attr("d", path)
     .attr("fill", "#fff")
     .attr("stroke", "#777")
     .attr("stroke-width", 2),
  svg.selectAll("circle")
     .data(data[1])
     .enter()
     .append("circle")
     .attr("class", "adm-circle")
     .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
     .attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
     .attr("r", function(d) {return d.p * rscale;})
     .attr("fill", "#800000")
     .attr("opacity", 0.3);
});

function showN() {
  circles.then(function(data) {
    svg.select()
       .transition()
       .duration(1000)
       .attr("r", function(d) {return d.p * rscale;});
  });
};
