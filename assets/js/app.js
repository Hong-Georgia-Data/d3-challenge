// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;


var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
//create the svg tag

var svg = d3.select("#scatter").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)

let state11 = [];


//JS IS a Horribly designed languages combined horribly yet useful libraries. CSV health-dat CREATE A PROMISE WHICH NO UNDERSTAND. 

var health_data=d3.csv("assets/data/data.csv").then(function(health_data){
  health_data.forEach(function(data) {
// STATE.AGE SHOULD EXIST AS A ARRAYS OUTSIDE IT AS EXECUTION CONTEXTS are different. 
// The function will look for those VARIABLES TO PUT IN

let state = [];
let age =[];
let smokers = [];
let dataset =[];
let age_smokers=[];
    state11.push(data.abbr);
    state.push(data.abbr);
    age.push(data.age);
    smokers.push(data.smokes);
    dataset.push({"State": data.abbr,
             "Age":  data.age,
            "Smokers": data.smokes});
    age_smokers.push({
            "Age":  data.age,
           "Smokers": data.smokes});
            // shift everything over by the margins
            
    var chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .append("a").attr("href", "#")
    .attr("data-toggle", "tooltip").attr("title", age);
            
    
/* Initialize tooltip */
tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return `The state of ${d.State} 
has the median age ${d.Age} with ${d.Smokers}% are smokers.`});
 
/* Invoke the tip in the context of your visualization */
chartGroup.call(tip);

    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.Age))
    .attr("cy", d => yLinearScale(d.Smokers))
    .attr("r", "7.5")
    .attr("stroke","red")
    .attr("fill", "black")    
    
    .attr("opacity", ".12") .on('mouseover', tip.show)
    .on('mouseout', tip.hide)    ;
    // .exit();
    var label=chartGroup.selectAll("g").data(dataset)
    .enter()
    .append("text")      
    .attr("font-family", "Yanone Kaffeesatz")
    .attr("font-size", "6.5")
    .attr("text-anchor", "middle")
    .attr("x", d => xLinearScale(d.Age))
    .attr("y", d => yLinearScale((d.Smokers)-0.2))

    .text(function(d){return d.State})
    .exit();

   // Step 1: Initialize Tooltip
       var toolTip = d3.tip()
       .attr("class", "tooltip")
       .style("left", "52px")
      //  .attr("position" , "responsive")
       .html(function(d) {
         return `${d}`;
       });

  }
);    
})



 // scale y to chart height
 var yLinearScale = d3.scaleLinear()
 // .domain([0, d3.max(age_smokers, data => data.Smokers)])
 .domain([0, 35])

 .range([height, 0]);


 // scale x to chart width
 var xLinearScale = d3.scaleLinear()
     // .domain([0, d3.max(age_smokers, data => data.age)])

     .domain([28, 50])
     .range([0, width]);


 // Create two new functions passing the scales in as arguments
   // These will be used to create the chart's axes
   var bottomAxis = d3.axisBottom(xLinearScale);
   var leftAxis = d3.axisLeft(yLinearScale);

svg.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
.attr("class", "axisText")
.text("AGE");


svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 45)
    .attr("x", 0 - height/2)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Smokers Percentage");


svg.append("g")
.attr("transform", `translate(${margin.left}, ${height +20})`)

    .call(bottomAxis);

svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`)
    .call(leftAxis);
// console.log(state);

console.log(state11);console.log(state11.length);

