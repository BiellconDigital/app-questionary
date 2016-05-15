import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
//import { Question } from '../../api/question/question.js';
//import { User } from '../../api/user/user.js';

export const Answer = new Mongo.Collection('answer');

export function answerGroupCount(questionId) {
	return Answer.aggregate([{$match: {question: questionId}}, {"$group": {_id:"$text", count:{$sum:1}}}]);
}
	 

if (Meteor.isServer) {
	// Meteor.publish('answerGroupCount', function(questionId) {
	// 	return Answer.aggregate([{$match: {question: questionId}}, {"$group": {_id:"$text", count:{$sum:1}}}]);
	// });

	Meteor.publish('getByQuestion', function(questionId) {
		return Answer.find({question: questionId});
	});


	Meteor.methods({
	  answerGroupCount
	});


}

/*
, {
  transform: function(doc) {
    doc.questionObj = Question.find({
      _id: doc.question
    });
    
    doc.userObj = User.find({
      _id: doc.user
    });
    
    return doc;
  }
}
*/

