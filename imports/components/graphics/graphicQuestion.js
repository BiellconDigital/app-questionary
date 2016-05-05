import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';

import { Question } from '../../api/question/question.js';
import { Answer } from '../../api/answer/answer.js';

import d3 from 'd3';
import cloud from 'd3-cloud';

import './graphicQuestion.html';
 
/*function CuestionaryListCtrl ($scope, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    console.log($scope.$parent)
    // Set Header
//    $scope.showHeader();
//    $scope.clearFabs();
//    $scope.isExpanded = false;
//    $scope.setExpanded(false);
//    $scope.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

/*    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    this.tasks = [{
      text: 'This is task 1'
    }, {
      text: 'This is task 2'
    }, {
      text: 'This is task 3'
    }];

    // Set Ink
    ionicMaterialInk.displayEffect();

}
CuestionaryListCtrl.$inject = ["$scope", "$timeout", "ionicMaterialMotion", "ionicMaterialInk"];
*/

const name = 'graphicQuestion';

class CuestionaryListCtrl {
  constructor($scope, $timeout, $reactive, $stateParams, ionicMaterialMotion, ionicMaterialInk) {
    'ngInject';

    ionicMaterialInk.displayEffect();

    let reactiveContext = $reactive(this).attach($scope);

//    $scope.viewModel(this);
 
  var fill = d3.scale.category20();

//Tracker.autorun(function () {
    reactiveContext.helpers({
      answers: function() {
        return Answer.find({question: "1"});
      }
    });

  this.wordsAnswer = [".NET", "Silverlight", "jQuery", "CSS3", "HTML5", "JavaScript", "SQL","C#"];

  this.autorun(() => {
    console.log(Answer.find({question: "1"}));
  });
 

    // $timeout(function() {
    //   this.wordsAnswer.push("lili");
    // }, 2200);

//  this.arrayAnswer = Answer.find();
//  this.wordsAnswer = arrayAnswer[3];

// while ( this.arrayAnswer.hasNext() ) {
//     race = this.arrayAnswer.next();
//     console.log( race.text );
//     wordsAnswer.push(race.text);
// }

  // Answer.find({}).forEach(function(option) {
  //     console.log(option);
  //     wordsAnswer.push(option.text);
  // });

//  this.wordsAnswer = 22; // This will cause the autorun function method to run again


  cloud().size([300, 300])
      .words(this.wordsAnswer.map(function(d) {
        return {text: d, size: 10 + Math.random() * 50};
      }))
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
    d3.select("div.contentGraphic").append("svg")
        .attr("width", 300)
        .attr("height", 300)
      .append("g")
        .attr("transform", "translate(150,150)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }

    }
}

export default angular.module(name, [
  angularMeteor,
  uiRouter
])
  .component(name, {
    templateUrl: 'imports/components/graphics/graphicQuestion.html',
    controllerAs: name,
    controller: CuestionaryListCtrl
  })
  .config(config);

function config($stateProvider, $compileProvider, $logProvider) {
  'ngInject';

  $compileProvider.debugInfoEnabled(false);
  $logProvider.debugEnabled(false);

  $stateProvider.state('graphic-question', {
    url: '/graphic-question',
    template: '<graphic-question></graphic-question>'
  });
}
