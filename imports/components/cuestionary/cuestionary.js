import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Question } from '../../api/question/question.js';
import { Answer } from '../../api/answer/answer.js';
import './cuestionary.html';

const name = 'cuestionary';

class CuestionaryListCtrl {
  constructor($scope, $rootScope, $timeout, $reactive, $stateParams, $state, 
                ionicMaterialMotion, ionicMaterialInk) {
    'ngInject';

    this.questionId = $stateParams.questionId;
    this.answerText = null;
    this.$state = $state;
    this.$rootScope = $rootScope;
    $scope.textButtonQuestion = 'Siguiente'
    $scope.styleHelp = '';
    $scope.styleContentHelp = '';
    this.anwserP1 = null;


    if ($stateParams.questionId == 6 ) {
      $scope.textButtonQuestion = 'Finalizar'
    }
    
    if ($stateParams.questionId > 6 ) {
      $state.go('welcome');
    }
    
    if ($stateParams.questionId == 1 
        || $stateParams.questionId == 3 || $stateParams.questionId == 4 || $stateParams.questionId == 6) {
      $scope.textPanelQuestion = 'MARCAR UNA OPCIÓN';
      $scope.styleHelp = 'help-question-select';
      $scope.styleContentHelp = 'question-content-select';
    } else {
      $scope.textPanelQuestion = 'Responder en máximo 2 palabras';
      $scope.styleHelp = 'help-question-input';
      $scope.styleContentHelp = 'question-content-input';
    }

    // $scope.optionsQuestion = function() {
    //   $stateParams.questionId
    // }

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
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up',
            startVelocity: 500
        });
    }, 100);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 1500
        });
    }, 900);

    // Set Motion
//    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();

    $reactive(this).attach($scope);

    this.nextQuestionId = this.questionId + 1;
    $scope.viewModel(this);
    console.log($rootScope.currentUser);

    this.helpers({
      question() {
        return Question.findOne({_id: $stateParams.questionId.toString()});
      }
    });

  }

  saveAnswerAndNext() {
    console.log("valores answer:: ");
    console.log(this.questionId);
    if (this.questionId == 1) {
      this.answerText = this.anwserP1;
    } else if (this.questionId == 3 || this.questionId == 6) {
      this.answerText = this.anwserP3;
    } else if (this.questionId == 4) {
      this.answerText = this.anwserP4;
    } else {
      this.answerText = this.answerText1 + ' ' + this.answerText2;
    }

    console.log(this.answerText);

    Answer.insert({
      user: this.$rootScope.currentUser._id,
      question: this.questionId,
      text: this.answerText,
      createdAt : new Date()
    });

    if (this.questionId <= 5) {
      this.$state.transitionTo('cuestionary', {questionId: this.nextQuestionId});
    } else {
      this.$state.transitionTo('completed');
    }
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
    url: '/cuestionary/{questionId:int}',
    template: '<cuestionary></cuestionary>'
  });
}
