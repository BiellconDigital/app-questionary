'use strict';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';

import ngAnimate from 'angular-animate';

import 'ionic-sdk/release/js/ionic';
import 'ionic-sdk/release/js/ionic-angular';


import './welcome.html';

const name = 'welcome';

class WelcomeCtrl {
  constructor($scope, $timeout, $q, ionicMaterialMotion, ionicMaterialInk) {
    'ngInject';
    

    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    ionicMaterialInk.displayEffect();

    
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
      url: '/',
      template: '<welcome></welcome>'
    });
}