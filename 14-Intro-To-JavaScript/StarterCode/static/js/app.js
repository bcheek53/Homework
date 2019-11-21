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

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  var filterInputs = {};

  if (datetime !== "") {
      filterInputs.datetime = inputValue;
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

// // Create a custom filtering function
// function selectDate(datefilter) {
//   return datefilter.datetime = inputValue;
// }

// // filter() uses the custom function as its argument
// var filterDate = tableData.filter(selectDate);

// // Test
// console.log(filterDate);




// // Step 1: Loop Through `data` and console.log each ufo object
// filterDate.forEach(function(ufoReport) {
//   console.log(ufoReport);
// });

// filterDate.forEach((ufoReport) => {
// var row = tbody.append("tr");
// Object.entries(ufoReport).forEach(([key, value]) => {
//   var cell = row.append("td");
//   cell.text(value);
// });
// });