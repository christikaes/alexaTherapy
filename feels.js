var _ = require('underscore');
var pos = require('pos');
var indico = require('indico.io');
indico.apiKey = '1bc005ab5acedb138d371dc703242b4a';

var onSentimentResponse = function(res) { 
    console.log("Sentiment: " + res);
    var response = res > .5 ? "You sound happy" : "You sound sad";
    console.log(response);
}
var logError = function(err) { console.log(err); }

var input = "I'm sad because my cat died.";
// var input = "I am in a terrible mood";

indico.sentiment(input)
    .then(onSentimentResponse)
    .catch(logError);

var tagger = new pos.Tagger();

var followUp = function(topics) {
    var nouns = _.filter(topics, function(topic) {
        return topic.pos === "NN";
    });
    nouns = _.sortBy(nouns, function(noun) {return noun.confidence;});
    console.log("Tell me more about the " + nouns[0].word);
}

var onKeywordResponse = function(keywords) {
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
    console.log(topics);
    followUp(topics);
}

indico.keywords(input, {version:2})
    .then(onKeywordResponse)
    .catch(logError);
