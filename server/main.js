import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';


Meteor.publish("chart1", function () {
    return Tasks.find({},{value:1,itemname:1,_id:0});
    
  });

Meteor.startup(() => {
  // code to run on server at startup
});
