import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';

import 'ionic-sdk/release/js/ionic';
import 'ionic-sdk/release/js/ionic-angular';

import { Question } from '../../api/question/question.js';


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
  constructor($scope, $timeout, $reactive, $stateParams, ionicMaterialMotion, ionicMaterialInk) {
    'ngInject';
    $scope.tasks = [{
      text: 'This is task 1'
    }, {
      text: 'This is task 2'
    }, {
      text: 'This is task 3'
    }];

    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    ionicMaterialInk.displayEffect();

    $reactive(this).attach($scope);

    this.questionId = $stateParams.questionId;

    $scope.viewModel(this);
 
    this.helpers({
      question() {
        return Question.findOne({_id: $stateParams.questionId});
      }
    });

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
