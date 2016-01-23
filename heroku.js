var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var pos = require('pos');
var indico = require("indico.io");
indico.apiKey = '1bc005ab5acedb138d371dc703242b4a';

var app = express();

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

app.get('/hello', function(req, res) {
  res.send('hello');
});

app.use(bodyParser.json()); // for parsing application/json

app.post('/respond', function (req, res, next) {
    var issue = req.body.issue;
    console.log(issue);

    analyzeIssue(issue, function(response) {
        res.json({
            "response" : response
        });
    });
});

function analyzeIssue(issue, callback) {
    var speechOutput = "Uh oh it didn't work";

    var logError = function(err) { 
        console.log(err);
        speechOutput = "I didn't understand.";
    }

    var getSentimentResponse =  function(){
        var onSentimentResponse = function(res) { 
            speechOutput = res > .5 ? "You sound happy." : "You sound sad.";
            getKeywordsResponse();
        }

        indico.sentiment(issue)
            .then(onSentimentResponse)
            .catch(logError);
    }

    var getKeywordsResponse = function(){

        var onKeywordResponse = function(keywords) {
            var tagger = new pos.Tagger();
            var taggedWords = tagger.tag(_.keys(keywords));
            var topics = [];

            _.each(taggedWords, function(item) {
                var word = item[0];
                topics.push({
                    word: word,
                    pos: item[1],
                    confidence: keywords[word]
                });
            });
            var nouns = _.filter(topics, function(topic) {
                return topic.pos === "NN";
            });
            nouns = _.sortBy(nouns, function(noun) {return noun.confidence;});

            speechOutput += " Tell me more about the " + nouns[0].word;

            callback(speechOutput);
        }

        indico.keywords(issue, {version:2})
            .then(onKeywordResponse)
            .catch(logError);
    }

    getSentimentResponse();
}

