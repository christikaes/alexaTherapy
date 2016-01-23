var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var pos = require('pos');
var indico = require("indico.io");
indico.apiKey = '1bc005ab5acedb138d371dc703242b4a';

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

// Alexa therapy endpoint
// Analyzes an utterance and responds with the speaker's mood
// and a follow-up question
app.post('/respond', function (req, res, next) {
    var issue = req.body.issue;
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

    // Analyze utterance for positive or negative mood
    var getSentimentResponse =  function(){
        var onSentimentResponse = function(res) { 
            speechOutput = res > .5 ? "You sound happy." : "You sound sad.";
            getKeywordsResponse();
        }

        indico.sentiment(issue)
            .then(onSentimentResponse)
            .catch(logError);
    }

    // Analyze utterance for keywords and construct followup question
    var getKeywordsResponse = function(){

        var onKeywordResponse = function(keywords) {
            // Tag keywords parts of speech          
            var tagger = new pos.Tagger();
            var taggedWords = tagger.tag(_.keys(keywords));
            
            // Find the most relevant keyword
            var topics = [];
            _.each(taggedWords, function(item) {
                var word = item[0];
                topics.push({
                    word: word,
                    pos: item[1],
                    confidence: keywords[word]
                });
            });
            // Nouns are probably the most relevant
            var nouns = _.filter(topics, function(topic) {
                return topic.pos === "NN";
            });
            // Which noun seemed the most important?
            nouns = _.sortBy(nouns, function(noun) {return noun.confidence;});

            // TODO: What if there isn't a noun? Add cases for adjectives and verbs.

            speechOutput += " Tell me more about the " + nouns[0].word;
            callback(speechOutput);
        }

        // Get keywords from utterance
        indico.keywords(issue, {version:2})
            .then(onKeywordResponse)
            .catch(logError);
    }

    getSentimentResponse();
}

