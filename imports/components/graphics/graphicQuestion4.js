import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import chart from 'chart';
import { Question } from '../../api/question/question.js';
import { Answer } from '../../api/answer/answer.js';

import d3 from 'd3';
import './graphicQuestion4.html';

const name = 'graphicQuestion4';

class GraphicQuestion4Ctrl {
  constructor($scope, $timeout, $reactive, $stateParams, ionicMaterialMotion, ionicMaterialInk) {
    'ngInject';
    $reactive(this).attach($scope);
    ionicMaterialInk.displayEffect();
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
//    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up',
            startVelocity: 500
        });
    }, 900);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 1500
        });
    }, 200);

//    this.subscribe('getByQuestion');

   this.helpers({
      answers() {
        return Answer.find({question: 4});
      },
      question() {
        return Question.findOne({_id: "4"});
      }
   });

/*

var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 1120 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom;

//var formatPercent = d3.format(".0%");

// D3 scales = just math
// x is a function that transforms from "domain" (data) into "range" (usual pixels)
// domain gets set after the data loads
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

// D3 Axis - renders a d3 scale in SVG
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


//var tip = d3.tip().html(function(d) { return d; });

var tip = d3_tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
  })


// create an SVG element (appended to body)
// set size
// add a "g" element (think "group")
// annoying d3 gotcha - the 'svg' variable here is a 'g' element
// the final line sets the transform on <g>, not on <svg>
var svg = d3.select("#barQ").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")

svg.append("g")
    .attr("class", "y axis")
  .append("text") // just for the title (ticks are automatic)
    .attr("transform", "rotate(-90)") // rotate the text!
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Votantes");

  this.dataBar = [
    {
      letter: 'A',
      frequency: 100
    },
    {
      letter: 'B',
      frequency: 200
    },
    {
      letter: 'C',
      frequency: 50
    },
  ];


//d3.tsv("data.tsv", type, 
function runBar(data) {

  data.forEach(function(d) {
    d.frequency = +d.frequency;
    console.log(d.frequency)
  });

  // measure the domain (for x, unique letters) (for y [0,maxFrequency])
  // now the scales are finished and usable
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  // another g element, this time to move the origin to the bottom of the svg element
  // someSelection.call(thing) is roughly equivalent to thing(someSelection[i])
  //   for everything in the selection\
  // the end result is g populated with text and lines!
  svg.select('.x.axis').transition().duration(300).call(xAxis)
    .selectAll("text")
    .attr("font-size", "1.6em")
    .style("fill", 'darkblue');

  // same for yAxis but with more transform and a title
  svg.select(".y.axis").transition().duration(300).call(yAxis)

/*
svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });
      // .on('mouseover', tip.show)
      // .on('mouseout', tip.hide)
*/

/*
  // THIS IS THE ACTUAL WORK!
//  var bars = svg.selectAll(".bar").data(data, function(d) { return d.letter; }) // (data) is an array/iterable thing, second argument is an ID generator function
  var bars = svg.selectAll(".bar").data(data) // (data) is an array/iterable thing, second argument is an ID generator function

  bars.exit()
    .transition()
      .duration(300)
    .attr("y", y(0))
    .attr("height", height - y(0))
    .style('fill-opacity', 1e-6)
    .remove();

  // data that needs DOM = enter() (a set/selection, not an event!)
  bars.enter().append("rect")
//    .style("fill", "steelblue")
    .attr("class", "barGraphic")
    .attr("y", y(0))
    .attr("height", height - y(0));

  // the "UPDATE" set:
  bars.transition().duration(300).attr("x", function(d) { return x(d.letter); }) // (d) is one item from the data array, x is the scale object from above
    .attr("width", x.rangeBand()) // constant, so no callback function(d) here
    .attr("y", function(d) { return y(d.frequency); })
    .attr("height", function(d) { return height - y(d.frequency); }); // flip the height, because y's domain is bottom up, but SVG renders top down



/*
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

*/
//}
//});
//runBar(this.dataBar);



    var optionsPie = {
        //Boolean - Whether we should animate the chart
        animation : true,

        //Number - Amount of animation steps
        animationSteps : 60,

        scaleShowLabels : false,

        //String - Animation easing effect
        animationEasing : "",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : true,

        showTooltips: false,

        onAnimationComplete: function () {

          var ctx = this.chart.ctx;
          ctx.font = this.scale.font;
          ctx.fillStyle = this.scale.textColor
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";

          this.datasets.forEach(function (dataset) {
              dataset.bars.forEach(function (bar) {
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillStyle = 'pink';
                  ctx.font = 'bold 1.5em Helvetica';
                  ctx.fillText(bar.value, bar.x, bar.y + 10);
              });
          })          
/*
          this.chart.ctx.fillStyle = 'black';
          this.chart.ctx.textBaseline = 'middle';
          this.chart.ctx.textAlign = 'start';
          this.chart.ctx.font="2em Helvetica";
          if (this.segments.length > 0) {

            var total = 0;
            for (var i = 0; i < this.segments.length; i++) { 
              total += this.segments[i].value;      
            }

            this.chart.ctx.fillText('Total: ' + total , this.chart.width / 2 - 90, this.chart.height / 2, 100);

            for(var i = 0; i < this.segments.length; i++) {
              var percentage = ((this.segments[i].value / total) * 100).toFixed(1);
              if( percentage > 3 ) {
                  var centreAngle = this.segments[i].startAngle + ((this.segments[i].endAngle - this.segments[i].startAngle) / 2),
                      rangeFromCentre = (this.segments[i].outerRadius - this.segments[i].innerRadius) / 2 + this.segments[i].innerRadius;
                  var x = this.segments[i].x + (Math.cos(centreAngle) * rangeFromCentre);
                  var y = this.segments[i].y + (Math.sin(centreAngle) * rangeFromCentre);
                  this.chart.ctx.textAlign = 'center';
                  this.chart.ctx.textBaseline = 'middle';
                  this.chart.ctx.fillStyle = '#fff';
                  this.chart.ctx.font = 'bold 1.4em Helvetica';
                  this.chart.ctx.fillText(percentage + '% (' +  this.segments[i].value + ')', x-13, y);
              }
            }

          }
*/
        },
    };


var data = {
    labels: ["Si, el sector privado puede ser un fuerte aliado"
      ,"No, la responsabilidad de la educación es sólo del gobierno"
    ],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [6, 2],
        },
    ]
};

    var ctx = $("#chartQ4").get(0).getContext("2d");
    var myNewChart = new Chart(ctx).Bar(data, optionsPie);

//    var legend = myNewChart.generateLegend();
//    $("#graph-legend").html(legend);




/************* ACTUALIZACION REAL TIME DE GRAFICOS ***************/
    this.autorun(() => {

      console.log(this.getReactively('answers'));

/*      console.log(this.getReactively('answers'));
      Meteor.call('answerGroupCount', 4, function(error, result) {
        console.log( "resultado group:", result);
        if (result.length > 0) {
          var wordsAnswerResult = [];
          var idInc = 1;
          result.forEach(function (answer) {
            wordsAnswerResult.push({
              id: idInc,
              letter: answer._id,
              frequency: answer.count
            });
            idInc = idInc + 1;
          });
          this.dataBar = wordsAnswerResult;
          console.log("finalizo ", wordsAnswerResult);
          runBar(dataBar);
          //plot.update();
        }

      });
*/

      Meteor.call('answerGroupCount', 4, function(error, result) {

        if (result.length > 0) {
          var wordsAnswerResult = new Object();
          var totalNo = 0, totalSi = 0;
          result.forEach(function (answer) {
            wordsAnswerResult[answer._id] = answer.count
            console.log('id: ', answer._id)
          });

          if (wordsAnswerResult.hasOwnProperty('Si, el sector privado puede ser un fuerte aliado'))
            totalSi =wordsAnswerResult['Si, el sector privado puede ser un fuerte aliado'];
          console.log('total si: ', totalSi);
          console.log('datasets: ', myNewChart.datasets)
          myNewChart.datasets[0].bars[0].value = totalSi;
          myNewChart.datasets[0].bars[0].fillColor = '#7DB8C2';

          if (wordsAnswerResult.hasOwnProperty('No, la responsabilidad de la educación es sólo del gobierno'))
            totalNo = wordsAnswerResult['No, la responsabilidad de la educación es sólo del gobierno'];
          console.log('total no: ', totalNo);
          myNewChart.datasets[0].bars[1].fillColor = '#056B71';
          myNewChart.datasets[0].bars[1].value = totalNo;

          myNewChart.update()
        }

      });


    });





  }
}



export default angular.module(name, [
  angularMeteor,
  uiRouter
])
  .component(name, {
    templateUrl: 'imports/components/graphics/graphicQuestion4.html',
    controllerAs: name,
    controller: GraphicQuestion4Ctrl
  })
  .config(config);

function config($stateProvider, $compileProvider, $logProvider) {
  'ngInject';

  $compileProvider.debugInfoEnabled(false);
  $logProvider.debugEnabled(false);

  $stateProvider.state('graphic-question-4', {
    url: '/graphic4',
    template: '<graphic-question-4></graphic-question-4>'
  });
}
