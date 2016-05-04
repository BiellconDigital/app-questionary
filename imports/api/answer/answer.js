import { Mongo } from 'meteor/mongo';
import { Question } from '../../api/question/question.js';

//export const Answer = new Mongo.Collection('answer');

export const Answer = new Mongo.Collection('answer', {
  transform: function(doc) {
    doc.questionObj = Question.find({
      _id: doc.question
    });
    
    doc.userObj = User.find({
      _id: doc.user
    });
    
    return doc;
  }
});

