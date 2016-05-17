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
    $scope.widthG = jQuery(window).width() - jQuery(window).width()*0.16,
    $scope.heightG = jQuery(window).height() - 250,
    
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 1500
        });
    }, 200);

    jQuery('.graphic4').height(jQuery(window).height() - jQuery(window).height()*0.35),

//    this.subscribe('getByQuestion');

   this.helpers({
      answers() {
        return Answer.find({question: 4}).count();
      },
      question() {
        return Question.findOne({_id: "4"});
      }
   });

    var optionsPie = {
        //Boolean - Whether we should animate the chart
        animation : true,

        //Number - Amount of animation steps
        animationSteps : 60,

        scaleShowLabels : true,

        //String - Animation easing effect
        animationEasing : "",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : true,

        showTooltips: false,

        responsive: true,

        onAnimationComplete: function () {

          var ctx = this.chart.ctx;
          ctx.font = this.scale.font;
          ctx.fillStyle = this.scale.textColor
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";

          this.datasets.forEach(function (dataset) {
              var maxValue = 0
              dataset.bars.forEach(function (bar) {
                  if (bar.value > maxValue) {
                    maxValue = bar.value;
                  }
              });

              dataset.bars.forEach(function (bar) {
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.font = 'bold 2.8em Helvetica';
                  if (bar.value == maxValue) {
                    ctx.fillStyle = 'white';
                    ctx.fillText(bar.value, bar.x, bar.y + 34);
                  }
                  else {
                    ctx.fillStyle = '#1367B5';
                    ctx.fillText(bar.value, bar.x, bar.y - 18);
                  }
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
    labels: ["SI"
      ,"NO"
    ],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [0, 0],
        },
    ]
};

    var ctx = $("#chartQ4").get(0).getContext("2d");
    var myNewChart = new Chart(ctx).Bar(data, optionsPie);
    // var legend = myNewChart.generateLegend();
    // $("#graph-legend-g4").html(legend);




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
          myNewChart.datasets[0].bars[0].fillColor = '#0662ab';

          if (wordsAnswerResult.hasOwnProperty('No, la responsabilidad de la educación es sólo del gobierno'))
            totalNo = wordsAnswerResult['No, la responsabilidad de la educación es sólo del gobierno'];
          console.log('total no: ', totalNo);
          myNewChart.datasets[0].bars[1].fillColor = '#e41129';
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
