'use strict';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './welcome.html';

const name = 'welcome';

class WelcomeCtrl {
  constructor($scope, $timeout, $q, ionicMaterialMotion, ionicMaterialInk) {
    'ngInject';

    ionicMaterialInk.displayEffect();

    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    // $scope.$on('$destroy', function() {
    //   console.log("destruyendo hoteles...");
    // });

  }
}

export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  templateUrl: 'imports/components/welcome/welcome.html',
  controllerAs: name,
  controller: WelcomeCtrl
})
  .config(config);
 
function config($stateProvider, $compileProvider, $logProvider) {
  'ngInject';

  $compileProvider.debugInfoEnabled(false);
  $logProvider.debugEnabled(false);

  $stateProvider
    .state('welcome', {
      url: '/welcome',
      template: '<welcome></welcome>'
    });
}