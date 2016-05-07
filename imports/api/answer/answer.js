import { Mongo } from 'meteor/mongo';
//import { Question } from '../../api/question/question.js';
//import { User } from '../../api/user/user.js';

export const Answer = new Mongo.Collection('answer');
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

