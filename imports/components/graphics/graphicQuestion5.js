import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Question } from '../../api/question/question.js';
import { Answer } from '../../api/answer/answer.js';
import d3 from 'd3';
import cloud from 'd3-cloud';
import './graphicQuestion5.html';

const name = 'graphicQuestion5';

class GraphicQuestion5Ctrl {
  constructor($scope, $timeout, $reactive, $stateParams, ionicMaterialMotion, ionicMaterialInk) {//, ionicMaterialMotion, ionicMaterialInk
    'ngInject';

    $reactive(this).attach($scope);
    ionicMaterialInk.displayEffect();
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
//    $scope.$parent.setHeaderFab(false);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 1500
        });
    }, 200);

//    this.subscribe('getByQuestion');

     this.helpers({
        getByQuestion() {
          return Answer.find({question: 5});
        },
        getTotalByQuestion() {
          return Answer.find({question: 5}).count();
        },
        question() {
          return Question.findOne({_id: "5"});
        }
     });

//    this.wordsAnswer = [];
    /************************** RENDERIZACION DEL GRAFICO ****************************/
    var fill = d3.scale.category20();
    var w = jQuery(window).width() - jQuery(window).width()*0.16,
    h = jQuery(window).height() - 165,
    words = [],
    max, scale = 1,
    svg = d3.select("div.contentGraphic").append("svg").attr("width", w).attr("height", h),
    background = svg.append("g"),
    vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")"),
    layout = cloud().timeInterval(10).size([w, h])
      .rotate(function() { return ~~(Math.random() * 2) * 1; })
      .font("Helvetica")
      .fontSize(function(t) { return fontSize(+t.value); }).text(function(t) {
        return t.key
      })
      .on("end", draw);
    layout.start();


    function draw(t) {
      words = t;
      var n = vis.selectAll("text").data(words, function(t) {
          return t.key.toLowerCase()
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
          return fill(t.key.toLowerCase())
      }).text(function(t) {
          return t.key
      });
      var a = background.append("g").attr("transform", vis.attr("transform")),
          r = a.node();
      n.exit().each(function() {
          r.appendChild(this)
      }), a.transition().duration(1e3).style("opacity", 1e-6).remove(), vis.transition().delay(1e3).duration(750).attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")")
    }
    
    function parseText(t) {
        tags = {};
        var e = {};
        var maxLength = 30;
        var unicodePunctuationRe = "!-#%-*,-/:;?@\\[-\\]_{}\xa1\xa7\xab\xb6\xb7\xbb\xbf\u037e\u0387\u055a-\u055f\u0589\u058a\u05be\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0af0\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f14\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1360-\u1368\u1400\u166d\u166e\u169b\u169c\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cc0-\u1cc7\u1cd3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205e\u207d\u207e\u208d\u208e\u2329\u232a\u2768-\u2775\u27c5\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc\u29fd\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00-\u2e2e\u2e30-\u2e3b\u3001-\u3003\u3008-\u3011\u3014-\u301f\u3030\u303d\u30a0\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uaaf0\uaaf1\uabeb\ufd3e\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a\uff1b\uff1f\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65";
        var stopWords = /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)$/,
        punctuation = new RegExp("[" + unicodePunctuationRe + "]", "g"),
    //    wordSeparators = /[ \f\n\r\t\v\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,
        discard = /^(@|https?:|\/\/)/;

        t.split(" ").forEach(function(t) {
            discard.test(t) || (t = t.replace(punctuation, ""), 
          stopWords.test(t.toLowerCase()) || (t = t.substr(0, maxLength), e[t.toLowerCase()] = t, 
            tags[t = t.toLowerCase()] = (tags[t] || 0) + 1))
        }), tags = d3.entries(tags).sort(function(t, e) {
            return e.value - t.value
        }), tags.forEach(function(t) {
            t.key = e[t.key]
        }), generate()
    }

    function generate() {
        layout.font('Helvetica'),
    //    spiral(d3.select("input[name=spiral]:checked").property("value")), 
        fontSize = d3.scale['log']().range([15, 78]), 
        tags.length && fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]), 
        complete = 0, words = [], 
        layout.stop().words(tags.slice(0, max = Math.min(tags.length, +200))).start()
    }
    /***************************************************************************/

/*function generate() {
    layout.font(d3.select("#font").property("value")).spiral(d3.select("input[name=spiral]:checked")
        .property("value")), 

    fontSize = d3.scale[d3.select("input[name=scale]:checked")
        .property("value")]().range([10, 100]), 
    tags.length && fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]), complete = 0, 
    statusText.style("display", null), words = [], 
        layout.stop().words(tags.slice(0, max = Math.min(tags.length, +d3.select("#max").property("value"))))
        .start()
}
*/

/************* ACTUALIZACION REAL TIME DE GRAFICOS ***************/
    this.autorun(() => {

//      console.log(this.getReactively('getByQuestion'));
      var wordsAnswerResult = "", totalAnswer = 0;
      this.getReactively('getByQuestion').forEach(function (answer) {
        if (totalAnswer == 0)
          wordsAnswerResult = wordsAnswerResult.concat(answer.text);
        else
          wordsAnswerResult = wordsAnswerResult.concat(" " + answer.text);
        totalAnswer = totalAnswer + 1;
      });
//      console.log("finalizo ", wordsAnswerResult);

      if (wordsAnswerResult.length > 0) {
        parseText( wordsAnswerResult );

      }

    });



  }
}



export default angular.module(name, [
  angularMeteor,
  uiRouter
])
  .component(name, {
    templateUrl: 'imports/components/graphics/graphicQuestion5.html',
    controllerAs: name,
    controller: GraphicQuestion5Ctrl
  })
  .config(config);

function config($stateProvider, $compileProvider, $logProvider) {
  'ngInject';

  $compileProvider.debugInfoEnabled(false);
  $logProvider.debugEnabled(false);

  $stateProvider.state('graphic-question-5', {
    url: '/graphic5',
    template: '<graphic-question-5></graphic-question-5>'
  });
}
