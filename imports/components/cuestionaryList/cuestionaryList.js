import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './cuestionaryList.html';
 
class CuestionaryListCtrl {
  constructor($scope) {
    this.tasks = [{
      text: 'This is task 1'
    }, {
      text: 'This is task 2'
    }, {
      text: 'This is task 3'
    }];

  }
}
 
export default angular.module('cuestionaryList', [
  angularMeteor
])
  .component('cuestionaryList', {
    templateUrl: 'imports/components/cuestionaryList/cuestionaryList.html',
    controller: CuestionaryListCtrl
  });
