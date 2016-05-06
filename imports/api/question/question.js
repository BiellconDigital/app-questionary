import { Mongo } from 'meteor/mongo';
//import { Answer } from '../../api/answer/answer.js';

//export const Question = new Mongo.Collection('question');

export const Question = new Mongo.Collection('question');
/*
, {
  transform: function(doc) {
    doc.answerObj = Answer.find({
      question: doc._id
    });
    return doc;
  }
}
*/

