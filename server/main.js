import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Question } from '../imports/api/question/question.js';
import { Answer } from '../imports/api/answer/answer.js';
import { User } from '../imports/api/user/user.js';
import { Tasks } from '../imports/api/tasks.js';

/*Meteor.publish("chart1", function () {
    return Tasks.find({},{value:1,itemname:1,_id:0});
});
*/

/*Meteor.publish("saveUser", function (user) {
	var userId = User.insert(user);
	console.log("id generado...");
	console.log(userId);
	//return user;
});
*/
//Question.remove({});

Meteor.startup(() => {
 if (Question.find().count() === 0) {
	Question.insert({
		_id: "1",
		descripcion: 'pregunta 1',
		detalle: 'detalle pregunta 1'
	});

	Question.insert({
		_id: "2",
		descripcion: 'pregunta 2',
		detalle: 'detalle pregunta 3'
	});
 }	
  // code to run on server at startup
});

// Meteor.methods({
//   'eval.ip'() {

// 	console.log(headers.getClientIP());

//   },
// });
// 	Meteor.call('eval.ip');

Meteor.onConnection(function (connection) {
	console.log("clientAddress: ");
	console.log(connection.clientAddress);
  // Check if connected client has their IP banned
})
