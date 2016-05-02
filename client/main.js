import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import { name as Init } from '../imports/components/init/init';

function onReady() {
		angular.bootstrap(document, [
			Init
		], {
			strictDi: true
		});
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
