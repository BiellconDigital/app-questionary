import { Mongo } from 'meteor/mongo';
//import { Answer } from '../../api/answer/answer.js';

//export const Question = new Mongo.Collection('question');

export const User = new Mongo.Collection('user');

/*
, {
  transform: function(doc) {
    doc.answerObj = Answer.find({
      user: doc._id
    });
    return doc;
  }
}*/
