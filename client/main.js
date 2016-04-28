import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tasks } from '../imports/api/tasks.js';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


Template.graph.topGenresChart = function() {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: this.username + "'s top genres"
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'genre',
            data: [
                ['Adventure',   45.0],
                ['Action',       26.8],
                ['Ecchi',   12.8],
                ['Comedy',    8.5],
                ['Yuri',     6.2]
            ]
        }]
    };
};





Template.chart.onCreated(function() {
	console.log("suscribiendo...")
  	chart1 = this.subscribe('chart1');
});
  
  /*global drawchart */  
  drawchart = function(datavalues,datalabels){

     var data = {
    labels: datalabels,
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,0,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: datavalues,
            
        },
       
    ]
}; 
   var ctx = $("#myChart").get(0).getContext("2d");
    new Chart(ctx).Line(data);
    console.log("drawchart...")
  };
 
    
Template.chart.rendered = function(){
      
	console.log("rendered...")
	Tracker.autorun(function () {
		console.log("autorun...")
          //if (chart1.ready()) {
          	//console.log("ready...")
                var budgetdata = Tasks.find();
                var datavalues=[];
                var datalabels=[];
                budgetdata.forEach(function(option) {
                    console.log(option.value);
                    datavalues.push(option.value);
                    datalabels.push(option.itemname)
                });
             
                drawchart(datavalues,datalabels);
         //}   
    
	});
};
