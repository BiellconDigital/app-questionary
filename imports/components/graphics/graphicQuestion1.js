import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Question } from '../../api/question/question.js';
import { Answer } from '../../api/answer/answer.js';

import d3 from 'd3';
import './graphicQuestion1.html';

const name = 'graphicQuestion1';

class GraphicQuestion1Ctrl {
  constructor($scope, $timeout, $reactive, $stateParams, ionicMaterialMotion, ionicMaterialInk) {
    'ngInject';

    ionicMaterialInk.displayEffect();
    $reactive(this).attach($scope);
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
//    $scope.$parent.setHeaderFab(false);

/*    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 100);

*/
    $scope.diameter = jQuery(window).height() - jQuery(window).height()*0.3;
//    console.log('diametro: ', $scope.diameter)
/*    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up',
            startVelocity: 500
        });
    }, 900);

*/    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 1500
        });
    }, 200);

$scope.net_worth = {
    'sinvotos': [
        { name: 'No hay votos', balance: 1 },
    ]
};

$scope.fill_color = function (group) {
  var fillColor = '';
  switch (group) {
      case 'Nada probable':
          fillColor = "#5EA099";
          break;
      case 'Poco probable':
          fillColor = "#1367B5";
          break;
      case 'Probable':
          fillColor = "#70A73A";
          break;
      case 'Muy probable':
          fillColor = "#75AADB";
          break;
      default:
          fillColor = "white";
  }
  return fillColor;
}

$scope.label_color = function (group) {
    return group === 'assets' ? 'black' : 'white';
}


    // this.subscribe('getByQuestion', function () {
    // console.log( "Inbox data ready." );
    // });

   this.helpers({
    answersTotal: function() {
      return Answer.find({question: 1}).count();
    },
    answersTotalNadaProbable: function() {
      return Answer.find({question: 1, text: 'Nada probable'}).count();
    },
    answersTotalPocoProbable: function() {
      return Answer.find({question: 1, text: 'Poco probable'}).count();
    },
    answersTotalProbable: function() {
      return Answer.find({question: 1, text: 'Probable'}).count();
    },
    answersTotalMuyProbable: function() {
      return Answer.find({question: 1, text: 'Muy probable'}).count();
    },
    question() {
      return Question.findOne({_id: "1"});
    }
   });

    this.autorun(() => {
      var wordsAnswerResult = {}, tieneElementos = false;

      if (this.getReactively('answersTotalNadaProbable') > 0 
        && this.getReactively('answersTotalNadaProbable') !== undefined ) {

        tieneElementos = true;
        wordsAnswerResult['Nada probable'] = [{
          name: 'Nada probable',
          balance: this.getReactively('answersTotalNadaProbable'),
          total: this.getReactively('answersTotal')
        }];
      }

      if (this.getReactively('answersTotalPocoProbable') > 0
        && this.getReactively('answersTotalPocoProbable') !== undefined ) {

        tieneElementos = true;
        wordsAnswerResult['Poco probable'] = [{
          name: 'Poco probable',
          balance: this.getReactively('answersTotalPocoProbable'),
          total: this.getReactively('answersTotal')
        }];
      }

      if (this.getReactively('answersTotalProbable') > 0
        && this.getReactively('answersTotalProbable') !== undefined ) {

        tieneElementos = true;
        wordsAnswerResult['Probable'] = [{
          name: 'Probable',
          balance: this.getReactively('answersTotalProbable'),
          total: this.getReactively('answersTotal')
        }];
      }

      if (this.getReactively('answersTotalMuyProbable') > 0
        && this.getReactively('answersTotalMuyProbable') !== undefined ) {

        tieneElementos = true;
        wordsAnswerResult['Muy probable'] = [{
          name: 'Muy probable',
          balance: this.getReactively('answersTotalMuyProbable'),
          total: this.getReactively('answersTotal')
        }];
      }

      if (tieneElementos) {
//        console.log('resultado a renderizar: ', wordsAnswerResult)
        $scope.net_worth = wordsAnswerResult;
      }

/*
      Meteor.call('answerGroupCount', 1, function(error, result) {
          console.log("inicio ", $scope.net_worth);

        console.log( "resultado group:", result);
        if (result.length > 0) {
          var wordsAnswerResult = {};

          result.forEach(function (answer) {
            wordsAnswerResult[answer._id] = [];
            wordsAnswerResult[answer._id].push({
              name: answer._id,
              balance: answer.count
            });
          });
          $scope.$apply(function () {
            $scope.net_worth = wordsAnswerResult;
          });
          console.log("finalizo ", $scope.net_worth);

        }

      });

*/
    });

//$meteor.autorun($scope, function() {
//});

//    reactiveContext.helpers({
//      answers: function() {
//        return Answer.find({question: "1"});
 //       return Meteor.subscribe('answerGroupCount', 1);
//        return Answer.aggregate([{$match: {question: 1}}, {"$group": {_id:"$text", count:{$sum:1}}}]);
/*return Answer.group({
    "cond": {
        "question": 1
    },
    "key": {
        "text": true
    },
    "initial": {
        "count": 0
    },
    "reduce": function(obj, prev) {
        if (true != null) if (true instanceof Array) prev.count += true.length;
        else prev.count++;
    }
});
*/
//      }
//    });

  }
}



export default angular.module(name, [
  angularMeteor,
  uiRouter,
  'bubbleCloud'
])
  .component(name, {
    templateUrl: 'imports/components/graphics/graphicQuestion1.html',
    controllerAs: name,
    controller: GraphicQuestion1Ctrl
  })
  .config(config);

function config($stateProvider, $compileProvider, $logProvider) {
  'ngInject';

  $compileProvider.debugInfoEnabled(false);
  $logProvider.debugEnabled(false);

  $stateProvider.state('graphic-question-1', {
    url: '/graphic1',
    template: '<graphic-question-1></graphic-question-1>'
  });
}
