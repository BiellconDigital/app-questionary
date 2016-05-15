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

User.remove({});
Question.remove({});
Answer.remove({});

*/
Meteor.startup(() => {
 if (Question.find().count() === 0) {
	Question.insert({
		_id: "1",
		descripcion: 'Después de todo lo visto hoy, ¿qué tan factible ves que se generen nuevas oportunidades laborales y educativas en el corto plazo para los jóvenes, a través de la Alianza del Pacífico?',
		detalle: ''
	});

	Question.insert({
		_id: "2",
		descripcion: 'Qué palabras representan mejor para ustedes la integración de los 4 países en términos de empleabilidad y educación?',
		detalle: '(Pregunta abierta - Responder en máximo 2 palabras)'
	});
	
	Question.insert({
		_id: "3",
		descripcion: '¿Creen que el concepto de educación dual (aprender trabajando) es una solución válida para afrontar el desempleo como lo es en Europa?',
		detalle: ''
	});
	
	Question.insert({
		_id: "4",
		descripcion: '¿Creen que el sector privado deba aliarse con los gobiernos para diseñar estrategias educacionales que promuevan el empleo en los jóvenes?',
		detalle: ''
	});
	
	Question.insert({
		_id: "5",
		descripcion: '¿Cómo aporta la digitalización en la búsqueda de empleos?',
		detalle: '(Pregunta abierta - Responder en máximo 2 palabras)'
	});

	Question.insert({
		_id: "6",
		descripcion: '¿Después de la experiencia de hoy, consideran que sería interesante que este evento se repita el próximo año en Chile?',
		detalle: ''
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
