import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Question } from '../../api/question/question.js';
import { Answer } from '../../api/answer/answer.js';


import './cuestionary.html';
 
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

const name = 'cuestionary';

class CuestionaryListCtrl {
  constructor($scope, $rootScope, $timeout, $reactive, $stateParams, $state, 
                ionicMaterialMotion, ionicMaterialInk) {
    'ngInject';

    this.answerText = null;
    this.$state = $state;
    this.$rootScope = $rootScope;

    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    ionicMaterialInk.displayEffect();

    $reactive(this).attach($scope);

    this.questionId = $stateParams.questionId;
    this.nextQuestionId = this.questionId + 1;
    $scope.viewModel(this);
    console.log($rootScope.currentUser);

    this.helpers({
      question() {
        return Question.findOne({_id: $stateParams.questionId});
      }
    });

  }

  saveAnswerAndNext() {
    console.log("valores answer:: ");
    console.log(this.questionId);
    console.log(this.answerText);
    Answer.insert({
      user: this.$rootScope.currentUser._id,
      question: this.questionId,
      text: this.answerText,
      createdAt : new Date()
    });

    this.$state.transitionTo('cuestionary', {questionId: this.nextQuestionId});
  }

}

export default angular.module(name, [
  angularMeteor,
  uiRouter
])
  .component(name, {
    templateUrl: 'imports/components/cuestionary/cuestionary.html',
    controllerAs: name,
    controller: CuestionaryListCtrl
  })
  .config(config);
  //.run(run);

function config($stateProvider, $compileProvider, $logProvider) {
  'ngInject';

  $compileProvider.debugInfoEnabled(false);
  $logProvider.debugEnabled(false);

  $stateProvider.state('cuestionary', {
    url: '/cuestionary/:questionId',
    template: '<cuestionary></cuestionary>'
  });
}