// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// YOUR CODE HERE!

// Step 1: Loop Through `data` and console.log each ufo object
tableData.forEach(rowData);
console.log(tableData)

// Function for populating row detail
function rowData(ufoReport) {
  var row = tbody.append("tr");
  Object.entries(ufoReport).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
};

// Select the button
var button = d3.select("#filter-btn");

button.on("click", function() {
  d3.event.preventDefault();
  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");
  
  var filterInputs = {};

  if (datetime !== "") {
      filterInputs.datetime = inputValue;
  }

  var inputState = d3.select("#state");
  var state = inputState.property("value").toLowerCase();

  if (state !== "") {
      filterInputs.state = state;
  }


  var inputCity = d3.select("#city");
  var city = inputCity.property("value").toLowerCase();

  if (city !== "") {
      filterInputs.city = city;
  }

  var inputShape = d3.select("#shape-filter");
  var shape = inputShape.property("value").toLowerCase();

  if (shape !== "") {
      filterInputs.shape = shape;
  }

  var filtered = tableData.filter(obj => {
    var criteria = true;
    Object.entries(filterInputs).forEach(([key, value]) => {
        criteria = criteria && (obj[key] === value);
    });
    return criteria;
});

console.log(filtered);

tbody.html("");

filtered.forEach(rowData);

});

// Select the Reset button
var buttonReset = d3.select("#reset-btn");

buttonReset.on("click", function() {
  d3.event.preventDefault();
  var allFilters = d3.selectAll("input")
  .property("value", ""); 
  tableData.forEach(rowData);

});