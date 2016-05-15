import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';

import { Question } from '../../api/question/question.js';
import { Answer } from '../../api/answer/answer.js';
import { Tasks } from '../../api/tasks.js';

import d3 from 'd3';
import cloud from 'd3-cloud';
import './graphicQuestion.html';

const name = 'graphicQuestion';

class CuestionaryListCtrl {
  constructor($scope, $timeout, $reactive, $stateParams) {//, ionicMaterialMotion, ionicMaterialInk
    'ngInject';

//    ionicMaterialInk.displayEffect();
    let reactiveContext = $reactive(this).attach($scope);
    $scope.viewModel(this);
 
    var fill = d3.scale.category20();

    reactiveContext.helpers({
      answers: function() {
        return Answer.find({question: "1"});
      },
      taskss: function() {
        return Tasks.find({});
      }
    });

    this.wordsAnswer = [];//[".NET", "Silverlight", "jQuery", "CSS3", "HTML5", "JavaScript", "SQL","C#"];
   
//    this.answersResult = Answer.find({question: "1"});

     //console.log(this.answers)
      // $timeout(function() {
      //   this.wordsAnswer.push("lili");
      // }, 2200);
    //this.arrayAnswer = Answer.find({question: "1"}).toArray()[3];
    $scope.question = "1";

    this.subscribe('answer');
/*
console.log(this.answersResult)
this.answersResult.forEach(function (answer) {
  console.log(answer.text);
  this.wordsAnswer.push(answer.text);
});

this.answersResult.map( function(u) {
  console.log(u.text);
  this.wordsAnswer.push(u.text);
  return u.text; 
});

*/

/************* GRAFICO PREGUNTA 2 ***************/
    var w = 300,
      h = 300,
      words = [],
      max, scale = 1,
      svg = d3.select("div.contentGraphic").append("svg").attr("width", w).attr("height", h),
      background = svg.append("g"),
      vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")"),
      layout = cloud().size([w, h])
        .words(this.wordsAnswer.map(function(d) {
          return {text: d, size: 10 + Math.random() * 50};
        }))
        .rotate(function() { return ~~(Math.random() * 2) * 70; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", draw);
    layout.start();

    function draw(t) {
      console.log("dibujando...", words)
      words = t;
      var n = vis.selectAll("text").data(words, function(t) {
          return t.text.toLowerCase()
      });
      n.transition().duration(1e3).attr("transform", function(t) {
          return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
      }).style("font-size", function(t) {
          return t.size + "px"
      }), n.enter().append("text").attr("text-anchor", "middle").attr("transform", function(t) {
          return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
      }).style("font-size", "1px").transition().duration(1e3).style("font-size", function(t) {
          return t.size + "px"
      }), n.style("font-family", function(t) {
          return t.font
      }).style("fill", function(t) {
          return fill(t.text.toLowerCase())
      }).text(function(t) {
          return t.text
      });
      var a = background.append("g").attr("transform", vis.attr("transform")),
          r = a.node();
      n.exit().each(function() {
          r.appendChild(this)
      }), a.transition().duration(1e3).style("opacity", 1e-6).remove(), vis.transition().delay(1e3).duration(750).attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")")
    }


/************* GRAFICO PREGUNTA 3 ***************
    var graphicConfigQuestion3 = liquidFillGaugeDefaultSettings();
    graphicConfigQuestion3.circleColor = "#FF7777";
    graphicConfigQuestion3.textColor = "#FF4444";
    graphicConfigQuestion3.waveTextColor = "#FFAAAA";
    graphicConfigQuestion3.waveColor = "#FFDDDD";
    graphicConfigQuestion3.circleThickness = 0.2;
    graphicConfigQuestion3.textVertPosition = 0.2;
    graphicConfigQuestion3.waveAnimateTime = 1000;
    var graphicQuestion3 = loadLiquidFillGauge("resultQuestion3", 55, graphicConfigQuestion3);

*/

$scope.init = function(percentage) {

  console.log('iniciando grafico')
   $scope.config = {
      circleColor: "#FF7777",
      textColor: '#FF4444',
      waveTextColor: "#FFAAAA",
      waveColor: "#FFDDDD",
      circleThickness: 0.1,
      circleFillGap: 0.06,
      textVertPosition: 0.2,
      waveAnimateTime: 1000
    };
  
}

      $timeout(function() {
        $scope.value = 40;
      }, 1000);

 

/************* ACTUALIZACION REAL TIME DE GRAFICOS ***************/
    this.autorun(() => {
      console.log(this.getReactively('answers'));
      var wordsAnswerResult = [];
      this.getReactively('answers').forEach(function (answer) {
        wordsAnswerResult.push(answer.text);
      });
      this.wordsAnswer = wordsAnswerResult;
      console.log("finalizo ", this.wordsAnswer);

      if (this.wordsAnswer.length > 0) {
        layout.stop().words(wordsAnswerResult.map(function(d) {
              return {text: d, size: 10 + Math.random() * 50};
            })).start();
      }
    });









var Bubbles, root, texts;

root = typeof exports !== "undefined" && exports !== null ? exports : this;

Bubbles = function() {
  var chart, clear, click, collide, collisionPadding, connectEvents, data, force, gravity, hashchange, height, idValue, jitter, label, margin, maxRadius, minCollisionRadius, mouseout, mouseover, node, rScale, rValue, textValue, tick, transformData, update, updateActive, updateLabels, updateNodes, width;
  width = 980;
  height = 510;
  data = [];
  node = null;
  label = null;
  margin = {
    top: 5,
    right: 0,
    bottom: 0,
    left: 0
  };
  maxRadius = 125;
  rScale = d3.scale.sqrt().range([0, maxRadius]);
  rValue = function(d) {
    return parseInt(d.count);
  };
  idValue = function(d) {
    return d.name;
  };
  textValue = function(d) {
    return d.name;
  };
  collisionPadding = 4;
  minCollisionRadius = 12;
  jitter = 0.5;
  transformData = function(rawData) {
    rawData.forEach(function(d) {
      d.count = parseInt(d.count);
      return rawData.sort(function() {
        return 0.5 - Math.random();
      });
    });
    return rawData;
  };
  tick = function(e) {
    var dampenedAlpha;
    dampenedAlpha = e.alpha * 0.1;
    node.each(gravity(dampenedAlpha)).each(collide(jitter)).attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
    return label.style("left", function(d) {
      return ((margin.left + d.x) - d.dx / 2) + "px";
    }).style("top", function(d) {
      return ((margin.top + d.y) - d.dy / 2) + "px";
    });
  };
  force = d3.layout.force().gravity(0).charge(0).size([width, height]).on("tick", tick);
  chart = function(selection) {
    return selection.each(function(rawData) {
      var maxDomainValue, svg, svgEnter;
      data = transformData(rawData);
      maxDomainValue = d3.max(data, function(d) {
        return rValue(d);
      });
      rScale.domain([0, maxDomainValue]);
      svg = d3.select(this).selectAll("svg").data([data]);
      svgEnter = svg.enter().append("svg");
      svg.attr("width", width + margin.left + margin.right);
      svg.attr("height", height + margin.top + margin.bottom);
      node = svgEnter.append("g").attr("id", "bubble-nodes").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      node.append("rect").attr("id", "bubble-background").attr("width", width).attr("height", height).on("click", clear);
      label = d3.select(this).selectAll("#bubble-labels").data([data]).enter().append("div").attr("id", "bubble-labels");
      update();
      hashchange();
      return d3.select(window).on("hashchange", hashchange);
    });
  };
  update = function() {
    data.forEach(function(d, i) {
      return d.forceR = Math.max(minCollisionRadius, rScale(rValue(d)));
    });
    force.nodes(data).start();
    updateNodes();
    return updateLabels();
  };
  updateNodes = function() {
    node = node.selectAll(".bubble-node").data(data, function(d) {
      return idValue(d);
    });
    node.exit().remove();
    return node.enter().append("a").attr("class", "bubble-node").attr("xlink:href", function(d) {
      return "#" + (encodeURIComponent(idValue(d)));
    }).call(force.drag).call(connectEvents).append("circle").attr("r", function(d) {
      return rScale(rValue(d));
    });
  };
  updateLabels = function() {
    var labelEnter;
    label = label.selectAll(".bubble-label").data(data, function(d) {
      return idValue(d);
    });
    label.exit().remove();
    labelEnter = label.enter().append("a").attr("class", "bubble-label").attr("href", function(d) {
      return "#" + (encodeURIComponent(idValue(d)));
    }).call(force.drag).call(connectEvents);
    labelEnter.append("div").attr("class", "bubble-label-name").text(function(d) {
      return textValue(d);
    });
    labelEnter.append("div").attr("class", "bubble-label-value").text(function(d) {
      return rValue(d);
    });
    label.style("font-size", function(d) {
      return Math.max(8, rScale(rValue(d) / 4)) + "px";
    }).style("width", function(d) {
      return 2.5 * rScale(rValue(d)) + "px";
    });
    label.append("span").text(function(d) {
      return textValue(d);
    }).each(function(d) {
      return d.dx = Math.max(2.5 * rScale(rValue(d)), this.getBoundingClientRect().width);
    }).remove();
    label.style("width", function(d) {
      return d.dx + "px";
    });
    return label.each(function(d) {
      return d.dy = this.getBoundingClientRect().height;
    });
  };
  gravity = function(alpha) {
    var ax, ay, cx, cy;
    cx = width / 2;
    cy = height / 2;
    ax = alpha / 8;
    ay = alpha;
    return function(d) {
      d.x += (cx - d.x) * ax;
      return d.y += (cy - d.y) * ay;
    };
  };
  collide = function(jitter) {
    return function(d) {
      return data.forEach(function(d2) {
        var distance, minDistance, moveX, moveY, x, y;
        if (d !== d2) {
          x = d.x - d2.x;
          y = d.y - d2.y;
          distance = Math.sqrt(x * x + y * y);
          minDistance = d.forceR + d2.forceR + collisionPadding;
          if (distance < minDistance) {
            distance = (distance - minDistance) / distance * jitter;
            moveX = x * distance;
            moveY = y * distance;
            d.x -= moveX;
            d.y -= moveY;
            d2.x += moveX;
            return d2.y += moveY;
          }
        }
      });
    };
  };
  connectEvents = function(d) {
    d.on("click", click);
    d.on("mouseover", mouseover);
    return d.on("mouseout", mouseout);
  };
  clear = function() {
    return location.replace("#");
  };
  click = function(d) {
    location.replace("#" + encodeURIComponent(idValue(d)));
    return d3.event.preventDefault();
  };
  hashchange = function() {
    var id;
    id = decodeURIComponent(location.hash.substring(1)).trim();
    return updateActive(id);
  };
  updateActive = function(id) {
    node.classed("bubble-selected", function(d) {
      return id === idValue(d);
    });
    if (id.length > 0) {
      return d3.select("#status").html("<h3>The word <span class=\"active\">" + id + "</span> is now active</h3>");
    } else {
      return d3.select("#status").html("<h3>No word is active</h3>");
    }
  };
  mouseover = function(d) {
    return node.classed("bubble-hover", function(p) {
      return p === d;
    });
  };
  mouseout = function(d) {
    return node.classed("bubble-hover", false);
  };
  chart.jitter = function(_) {
    if (!arguments.length) {
      return jitter;
    }
    jitter = _;
    force.start();
    return chart;
  };
  chart.height = function(_) {
    if (!arguments.length) {
      return height;
    }
    height = _;
    return chart;
  };
  chart.width = function(_) {
    if (!arguments.length) {
      return width;
    }
    width = _;
    return chart;
  };
  chart.r = function(_) {
    if (!arguments.length) {
      return rValue;
    }
    rValue = _;
    return chart;
  };
  return chart;
};

root.plotData = function(selector, data, plot) {
  return d3.select(selector).datum(data).call(plot);
};



$(function() {
  var display, key, plot, text;
  plot = Bubbles();

  display = function(data) {
    return root.plotData("#vis", data, plot);
  };

/*  
  key = decodeURIComponent(location.search).replace("?", "");
  text = texts.filter(function(t) {
    return t.key === key;
  })[0];
  if (!text) {
    text = texts[0];
  }
  $("#text-select").val(key);
  d3.select("#jitter").on("input", function() {
    return plot.jitter(parseFloat(this.output.value));
  });
  d3.select("#text-select").on("change", function(e) {
    key = $(this).val();
    location.replace("#");
    return location.search = encodeURIComponent(key);
  });
*/

  var data = [
    {
      id: 1,
      name: 'muy poco probable',
      count: 100
    },
    {
      id: 2,
      name: 'poco probable',
      count: 130
    },
    {
      id: 3,
      name: 'probable',
      count: 503
    }
  ];
//  d3.select("#book-title").html(text.name);
  display(data);
});








var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
//    .tickFormat(formatPercent);

//var tip = d3.tip().html(function(d) { return d; });

var tip = d3_tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
  })


var svg = d3.select("#barQ").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

  var dataBar = [
    {
      letter: 'A',
      frequency: 100
    },
    {
      letter: 'B',
      frequency: 200
    },
    {
      letter: 'C',
      frequency: 50
    },
  ];


//d3.tsv("data.tsv", type, 
function runBar(data) {

  data.forEach(function(d) {
    d.frequency = +d.frequency;
    console.log(d.frequency)
  });

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });
      // .on('mouseover', tip.show)
      // .on('mouseout', tip.hide)


/*
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

*/
}
//});
runBar(dataBar);

function type(d) {
  d.frequency = +d.frequency;
  return d;
}





  }
}



export default angular.module(name, [
  angularMeteor,
  'angularD3LiquidFillGauge',
  uiRouter
])
  .component(name, {
    templateUrl: 'imports/components/graphics/graphicQuestion.html',
    controllerAs: name,
    controller: CuestionaryListCtrl
  })
  .config(config);

function config($stateProvider, $compileProvider, $logProvider) {
  'ngInject';

  $compileProvider.debugInfoEnabled(false);
  $logProvider.debugEnabled(false);

  $stateProvider.state('graphic-question', {
    url: '/',
    template: '<graphic-question></graphic-question>'
  });
}
