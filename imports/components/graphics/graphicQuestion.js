import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';

import { Question } from '../../api/question/question.js';
import { Answer } from '../../api/answer/answer.js';
import { Tasks } from '../../api/tasks.js';

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

    $scope.viewModel(this);
 
    var fill = d3.scale.category20();

//Tracker.autorun(function () {
    reactiveContext.helpers({
      answers: function() {
        return Answer.find({question: "1"});
      },
      taskss: function() {
        return Tasks.find({});
      }
    });


    this.wordsAnswer = ["java"];//[".NET", "Silverlight", "jQuery", "CSS3", "HTML5", "JavaScript", "SQL","C#"];
   
//    this.answersResult = Answer.find({question: "1"});

     //console.log(this.answers)
      // $timeout(function() {
      //   this.wordsAnswer.push("lili");
      // }, 2200);
    //this.arrayAnswer = Answer.find({question: "1"}).toArray()[3];
    $scope.question = "1";

    this.subscribe('answer');
/*
console.log(this.answersResult)
this.answersResult.forEach(function (answer) {
  console.log(answer.text);
  this.wordsAnswer.push(answer.text);
});

this.answersResult.map( function(u) {
  console.log(u.text);
  this.wordsAnswer.push(u.text);
  return u.text; 
});

*/

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


      var svg = d3.select("div.contentGraphic").append("svg").attr("width", 300).attr("height", 300),
        w = 300,
        h = 300,
        words = [],
        max, scale = 1,
        background = svg.append("g"),
        vis = svg.append("g").attr("transform", "translate(" + [300 >> 1, 300 >> 1] + ")"),
//        var vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");
        layout = cloud().size([300, 300])
          .words(this.wordsAnswer.map(function(d) {
            return {text: d, size: 10 + Math.random() * 50};
          }))
          .rotate(function() { return ~~(Math.random() * 2) * 70; })
          .font("Impact")
          .fontSize(function(d) { return d.size; })
          .on("end", draw);
        layout.start();

      function draw(t) {
        console.log("dibujando...", words)
        // d3.select("div.contentGraphic").append("svg")
        //     .attr("width", 300)
        //     .attr("height", 300)


        //   .append("g")
        //     .attr("transform", "translate(150,150)")

/*
          vis.selectAll("text")
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
*/

//    statusText.style("display", "none"), scale = e ? Math.min(w / Math.abs(e[1].x - w / 2), w / Math.abs(e[0].x - w / 2), h / Math.abs(e[1].y - h / 2), h / Math.abs(e[0].y - h / 2)) / 2 : 1, 
    words = t;
    var n = vis.selectAll("text").data(words, function(t) {
        return t.text.toLowerCase()
    });
    n.transition().duration(1e3).attr("transform", function(t) {
        return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
    }).style("font-size", function(t) {
        return t.size + "px"
    }), n.enter().append("text").attr("text-anchor", "middle").attr("transform", function(t) {
        return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
    }).style("font-size", "1px").transition().duration(1e3).style("font-size", function(t) {
        return t.size + "px"
    }), n.style("font-family", function(t) {
        return t.font
    }).style("fill", function(t) {
        return fill(t.text.toLowerCase())
    }).text(function(t) {
        return t.text
    });
    var a = background.append("g").attr("transform", vis.attr("transform")),
        r = a.node();
    n.exit().each(function() {
        r.appendChild(this)
    }), a.transition().duration(1e3).style("opacity", 1e-6).remove(), vis.transition().delay(1e3).duration(750).attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")")


      }


      this.autorun(() => {
    //    console.log('Autorun!!', this.getReactively('wordsAnswer'));
    //    console.log('Autorun 2!!', this.getReactively('answersResult'));
        console.log(this.getReactively('answers'));

        var wordsAnswerResult = [];

        this.getReactively('answers').forEach(function (answer) {
          console.log(answer.text);
          wordsAnswerResult.push(answer.text);
        });
        this.wordsAnswer = wordsAnswerResult;
        console.log("finalizo ", this.wordsAnswer);

        layout.stop().words(wordsAnswerResult.map(function(d) {
              return {text: d, size: 10 + Math.random() * 50};
            })).start();
        });

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
