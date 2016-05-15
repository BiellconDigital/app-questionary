import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import chart from 'chart';

import { Question } from '../../api/question/question.js';
import { Answer } from '../../api/answer/answer.js';

import d3 from 'd3';
import './graphicQuestion6.html';

const name = 'graphicQuestion6';

class GraphicQuestion6Ctrl {
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

   this.helpers({
      answers() {
        return Answer.find({question: 6});
      },
      question() {
        return Question.findOne({_id: "6"});
      }
   });

    var optionsPie = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,

        //String - The colour of each segment stroke
        segmentStrokeColor : "#fff",

        //Number - The width of each segment stroke
        segmentStrokeWidth : 2,

        //The percentage of the chart that we cut out of the middle.
        percentageInnerCutout : 45,

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

        },
        scaleLabelPaddingX: 35,
        scaleFontFamily : "'Helvetica'",
        scaleFontSize : 14,
        scaleFontStyle : "normal",
        scaleFontColor : "#666",
        scaleLabel : "<%=value%>"
    };

    var data = [
        {
            value: 1,
            color:"#27AE60",
            highlight: "#2ECC71",
            label: "Si"
        },
        {
            value: 1,
            color: "#16A085",
            highlight: "#1ABC9C",
            label: "No"
        }
    ]

    var ctx = $("#chartQ6").get(0).getContext("2d");
    var myNewChart = new Chart(ctx).Doughnut(data, optionsPie);

    var legend = myNewChart.generateLegend();
    $("#graph-legend").html(legend);


/************* ACTUALIZACION REAL TIME DE GRAFICOS ***************/
    this.autorun(() => {
      console.log(this.getReactively('answers'));
      Meteor.call('answerGroupCount', 6, function(error, result) {

        if (result.length > 0) {
          var wordsAnswerResult = new Object();
          var totalNo = 0, totalSi = 0;
          result.forEach(function (answer) {
            wordsAnswerResult[answer._id] = answer.count
            console.log('id: ', answer._id)
          });

          if (wordsAnswerResult.hasOwnProperty('Si'))
            totalSi =wordsAnswerResult['Si'];
          console.log('total si: ', totalSi);
          myNewChart.segments[0].value = totalSi;

          if (wordsAnswerResult.hasOwnProperty('No'))
            totalNo = wordsAnswerResult['No'];
          console.log('total no: ', totalNo);
          myNewChart.segments[1].value = totalNo;

          myNewChart.update()
        }

      });

    });





  }
}



export default angular.module(name, [
  angularMeteor,
//  'angularD3LiquidFillGauge',
  uiRouter
])
  .component(name, {
    templateUrl: 'imports/components/graphics/graphicQuestion6.html',
    controllerAs: name,
    controller: GraphicQuestion6Ctrl
  })
  .config(config);

function config($stateProvider, $compileProvider, $logProvider) {
  'ngInject';

  $compileProvider.debugInfoEnabled(false);
  $logProvider.debugEnabled(false);

  $stateProvider.state('graphic-question-6', {
    url: '/graphic6',
    template: '<graphic-question-6></graphic-question-6>'
  });
}