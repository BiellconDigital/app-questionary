'use strict';
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { name as cuestionary } from '../cuestionary/cuestionary';
import { name as welcome } from '../welcome/welcome';
import { name as completed } from '../completed/completed';
//import { name as graphicQuestion } from '../graphics/graphicQuestion';
import { name as graphicQuestion1 } from '../graphics/graphicQuestion1';
import { name as graphicQuestion2 } from '../graphics/graphicQuestion2';
import { name as graphicQuestion3 } from '../graphics/graphicQuestion3';
import { name as graphicQuestion4 } from '../graphics/graphicQuestion4';
import { name as graphicQuestion5 } from '../graphics/graphicQuestion5';
import { name as graphicQuestion6 } from '../graphics/graphicQuestion6';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

import 'ionic-sdk/release/js/ionic';
import 'ionic-sdk/release/js/ionic-angular';

import { User } from '../../api/user/user.js';

import './web.html';

function Init ($scope, $rootScope, $timeout, $reactive, $ionicPopup, $state, $window,
    ionicMaterialMotion, ionicMaterialInk) {

  $rootScope.currentUser = null;
  $reactive(this).attach($scope);
      
  if (localStorage['user'] === undefined) {

//      console.log("iniciando insercion");


      // Meteor.call('saveUser', {username: 'invitado', completeCuestionary: false, createdAt : new Date()}, 
      //   function(error, result){
      //     console.log("usuario insertado");
      //     console.log(result);
      // });
      var userId = User.insert({username: 'invitado', completeCuestionary: false, createdAt : new Date()}
        , function(error, result) {
            if ( error ) {
//              console.log ( error );//info about what went wrong
              alertInputs = $ionicPopup.alert({
                  title : 'Alerta',
                  template: 'No pudimos registrar su acceso. Click en el botón OK para interntar nuevamente.'
              });
              alertInputs.then(function(res) {
                $window.location.reload();
              });

            }
            if ( result ) {
//              console.log ( result ); //the _id of new object if successful
              $rootScope.currentUser = {
                _id: userId,
                username: 'invitado', completeCuestionary: false, createdAt : new Date(),
                q1:false, q2:false, q3:false, q4:false, q5:false, q6:false
              };

              //Meteor.subscribe('saveUser', $rootScope.currentUser);
//              console.log($rootScope.currentUser);
//              console.log("finalizando insercion");
              localStorage['user'] = JSON.stringify($rootScope.currentUser);
            }
        });
  } else {
      $rootScope.currentUser = JSON.parse(localStorage['user']);
//      console.log("usuario registrado");
//      console.log(localStorage['user']);
  }

    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

/*    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

*/   
 ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

}
Init.$inject = ["$scope", "$rootScope", "$timeout", "$reactive", "$ionicPopup", "$state", "$window",
  "ionicMaterialMotion", "ionicMaterialInk"];


const name = 'init';

export default angular.module(name, [
  angularMeteor,
  ngSanitize,
  uiRouter,
  'ionic',
  'ionic-material',
  'ionMdInput',
//  'angularD3LiquidFillGauge',
  welcome,
  cuestionary,
  graphicQuestion1,
  graphicQuestion2,
  graphicQuestion3,
  graphicQuestion4,
  graphicQuestion5,
  graphicQuestion6,
  completed
])
.component(name, {
  templateUrl: 'imports/components/init/web.html',
  controllerAs: name,
  controller: Init
})
  .config(config)
  .run(run);

function config($locationProvider, $urlRouterProvider, $compileProvider, $logProvider, $ionicConfigProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $compileProvider.debugInfoEnabled(false);
  $logProvider.debugEnabled(false);

  // Turn off caching for demo simplicity's sake
  $ionicConfigProvider.views.maxCache(0);

//  const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

 /* $mdIconProvider
    .iconSet('social',
      iconPath + 'svg-sprite-social.svg')
    .iconSet('action',
      iconPath + 'svg-sprite-action.svg')
    .iconSet('communication',
      iconPath + 'svg-sprite-communication.svg')
    .iconSet('content',
      iconPath + 'svg-sprite-content.svg')
    .iconSet('toggle',
      iconPath + 'svg-sprite-toggle.svg')
    .iconSet('navigation',
      iconPath + 'svg-sprite-navigation.svg')
    .iconSet('image',
      iconPath + 'svg-sprite-image.svg');*/
}

function run($rootScope, $state, $ionicPlatform) {
  'ngInject';

  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
     
    }
  );

  $ionicPlatform.ready(function() {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
      }

  });

}