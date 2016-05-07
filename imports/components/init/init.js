'use strict';
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { name as cuestionary } from '../cuestionary/cuestionary';
import { name as welcome } from '../welcome/welcome';
import { name as graphicQuestion } from '../graphics/graphicQuestion';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

import 'ionic-sdk/release/js/ionic';
import 'ionic-sdk/release/js/ionic-angular';

import { User } from '../../api/user/user.js';

import './web.html';

function Init ($scope, $rootScope, $timeout, $reactive, ionicMaterialMotion, ionicMaterialInk) {

  $rootScope.currentUser = null;
  $reactive(this).attach($scope);
      
  if (localStorage['user'] === undefined) {

      console.log("iniciando insercion");


      // Meteor.call('saveUser', {username: 'invitado', completeCuestionary: false, createdAt : new Date()}, 
      //   function(error, result){
      //     console.log("usuario insertado");
      //     console.log(result);
      // });
      var userId = User.insert({username: 'invitado', completeCuestionary: false, createdAt : new Date()});
      $rootScope.currentUser = {
        _id: userId,
        username: 'invitado', completeCuestionary: false, createdAt : new Date()
      };

      //Meteor.subscribe('saveUser', $rootScope.currentUser);
      console.log($rootScope.currentUser);
      console.log("finalizando insercion");
      localStorage['user'] = JSON.stringify($rootScope.currentUser);
  } else {
      $rootScope.currentUser = JSON.parse(localStorage['user']);
      console.log("usuario registrado");
//      console.log(localStorage['user']);
  }


    // Set Header
//    $scope.showHeader();
//    $scope.clearFabs();
//    $scope.isExpanded = false;
//    $scope.setExpanded(false);
//    $scope.setHeaderFab(false);

    // Set Motion

/*    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
*/
    // Set Ink
//    ionicMaterialInk.displayEffect();

}
Init.$inject = ["$scope", "$rootScope", "$timeout", "$reactive", "ionicMaterialMotion", "ionicMaterialInk"];


const name = 'init';

export default angular.module(name, [
  angularMeteor,
  ngSanitize,
  uiRouter,
  'ionic',
  'ionic-material',
  'ionMdInput',
  welcome,
  cuestionary,
  graphicQuestion
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
  console.log("init run...")

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


/*
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tasks } from '../imports/api/tasks.js';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


Template.graph.topGenresChart = function() {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: this.username + "'s top genres"
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'genre',
            data: [
                ['Adventure',   45.0],
                ['Action',       26.8],
                ['Ecchi',   12.8],
                ['Comedy',    8.5],
                ['Yuri',     6.2]
            ]
        }]
    };
};





Template.chart.onCreated(function() {
	console.log("suscribiendo...")
  	chart1 = this.subscribe('chart1');
});
  
  drawchart = function(datavalues,datalabels){

     var data = {
    labels: datalabels,
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,0,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: datavalues,
            
        },
       
    ]
}; 
   var ctx = $("#myChart").get(0).getContext("2d");
    new Chart(ctx).Line(data);
    console.log("drawchart...")
  };
 
    
Template.chart.rendered = function(){
      
	console.log("rendered...")
	Tracker.autorun(function () {
		console.log("autorun...")
          //if (chart1.ready()) {
          	//console.log("ready...")
                var budgetdata = Tasks.find();
                var datavalues=[];
                var datalabels=[];
                budgetdata.forEach(function(option) {
                    console.log(option.value);
                    datavalues.push(option.value);
                    datalabels.push(option.itemname)
                });
             
                drawchart(datavalues,datalabels);
         //}   
    
	});
};

*/
