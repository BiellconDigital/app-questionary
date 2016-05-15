'use strict';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './completed.html';

const name = 'completed';

class CompletedCtrl {
  constructor($scope, $timeout, $q, ionicMaterialMotion, ionicMaterialInk) {
    'ngInject';

    ionicMaterialInk.displayEffect();
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 500);

  }
}

export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  templateUrl: 'imports/components/completed/completed.html',
  controllerAs: name,
  controller: CompletedCtrl
})
  .config(config);
 
function config($stateProvider, $compileProvider, $logProvider) {
  'ngInject';

  $compileProvider.debugInfoEnabled(false);
  $logProvider.debugEnabled(false);

  $stateProvider
    .state('completed', {
      url: '/completed',
      template: '<completed></completed>'
    });
}