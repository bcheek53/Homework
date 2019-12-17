// @TODO: YOUR CODE HERE!

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 40,
  bottom: 60,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from csv file
d3.csv("/assets/data/data.csv").then(function(healthData) {

// Cast the poverty and healthcare values to a number for each piece of data
    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // Scale function
    var xScale = d3.scaleLinear().range([0, chartWidth]);
    var yScale = d3.scaleLinear().range([chartHeight, 0]);

    // Create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    var xMin;
    var xMax;
    var yMin;
    var yMax;
    
    xMin = d3.min(healthData, function(data) {
        return +data.healthcare;
    });
    
    xMax = d3.max(healthData, function(data) {
        return +data.healthcare;
    });
    
    yMin = d3.min(healthData, function(data) {
        return +data.poverty;
    });
    
    yMax = d3.max(healthData, function(data) {
        return +data.poverty;
    });
    
    xScale.domain([xMin, xMax]).nice();
    yScale.domain([0, yMax]).nice();
    console.log(yMax);

  
    // Append x to the bottom of the chart      
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    // Append y to the left of the chart
    chartGroup.append("g")
        .call(yAxis);
    
   // Create circles for scatter plot
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", data => xScale(data.poverty +1.5))
        .attr("cy", data => yScale(data.healthcare +0.3))
        .attr("r", "12")
        .attr("fill", "green")
        .attr("opacity", .5);

    // Appending a label to each data point
    chartGroup.append("text")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .selectAll("tspan")
        .data(healthData)
        .enter()
        .append("tspan")
            .attr("x", function(data) {
                return xScale(data.poverty +1.5);
            })
            .attr("y", function(data) {
                return yScale(data.healthcare +0.3);
            })
            .text(function(data) {
                return data.abbr
            });

    // Append y-axis label
    chartGroup
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left + 40)
        .attr("x", 0 - chartHeight/2)
        .attr("dy","1em")
        .attr("class", "axis-text")
        .text("Lacks Healthcare (%)")

    // Append x-axis labels
    chartGroup
        .append("text")
        .attr(
            "transform",
            "translate(" + chartWidth / 2 + " ," + (chartHeight + chartMargin.top + 30) + ")"
        )
        .attr("class", "axis-text")
        .text("In Poverty (%)");

    
});
