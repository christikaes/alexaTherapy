//initialize express
var express = require('express');

//initialize alexa-app
var alexa = require('alexa-app');

//initialize body-parser
var bodyParser = require('body-parser');

//initialize the app and set the port
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine','ejs');


//create and assign our Alexa App instance to an address on express, in this case https://hey-dad.herokuapp.com/api/hey-dad
var alexaApp = new alexa.app('hey-dad');
alexaApp.express(app, "/api/");

//make sure we're listening on the assigned port
app.listen(app.get('port'), function() {

    console.log("Node app is running at localhost:" + app.get('port'));

});

var _ = require('underscore');
var pos = require('pos');
var indico = require("indico.io");
indico.apiKey = '1bc005ab5acedb138d371dc703242b4a';


//our intent that is launched when "Hey Alexa, open Hey Dad" command is made
//since our app only has the one function (tell a bad joke), we will just do that when it's launched
alexaApp.launch(function(request,response) {
    //log our app launch
    console.log("App launched"); 
    
    // //our joke which we share to both the companion app and the Alexa device
    // var joke = getJoke();
    // //if we failed to get a joke, apologize
    // if(!joke){
    //     joke = jokeFailed;
    // }else{
    //     //only display it in the companion app if we have a joke
    //     response.card(joke);
    // }
    response.say("Welcome");
    response.send();
    
});

app.get('/hello', function(req, res) {
  res.send('hello');
});



// /**
//  * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
//  * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
//  * testing instructions are located at http://amzn.to/1LzFrj6
//  *
//  * For additional samples, visit the Alexa Skills Kit Getting Started guide at
//  * http://amzn.to/1LGWsLG
//  */

// // Route the incoming request based on type (LaunchRequest, IntentRequest,
// // etc.) The JSON body of the request is provided in the event parameter.
// exports.handler = function (event, context) {
//     try {
//         console.log("event.session.application.applicationId=" + event.session.application.applicationId);

//         /**
//          * Uncomment this if statement and populate with your skill's application ID to
//          * prevent someone else from configuring a skill that sends requests to this function.
//          */
//         /*
//         if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.[unique-value-here]") {
//              context.fail("Invalid Application ID");
//         }
//         */

//         if (event.session.new) {
//             onSessionStarted({requestId: event.request.requestId}, event.session);
//         }

//         if (event.request.type === "LaunchRequest") {
//             onLaunch(event.request,
//                 event.session,
//                 function callback(sessionAttributes, speechletResponse) {
//                     context.succeed(buildResponse(sessionAttributes, speechletResponse));
//                 });
//         } else if (event.request.type === "IntentRequest") {
//             onIntent(event.request,
//                 event.session,
//                 function callback(sessionAttributes, speechletResponse) {
//                     context.succeed(buildResponse(sessionAttributes, speechletResponse));
//                 });
//         } else if (event.request.type === "SessionEndedRequest") {
//             onSessionEnded(event.request, event.session);
//             context.succeed();
//         }
//     } catch (e) {
//         context.fail("Exception: " + e);
//     }
// };

// /**
//  * Called when the session starts.
//  */
// function onSessionStarted(sessionStartedRequest, session) {
//     console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
//         ", sessionId=" + session.sessionId);
// }

// /**
//  * Called when the user launches the skill without specifying what they want.
//  */
// function onLaunch(launchRequest, session, callback) {
//     console.log("onLaunch requestId=" + launchRequest.requestId +
//         ", sessionId=" + session.sessionId);

//     // Dispatch to your skill's launch.
//     getWelcomeResponse(callback);
// }

// /**
//  * Called when the user specifies an intent for this skill.
//  */
// function onIntent(intentRequest, session, callback) {
//     console.log("onIntent requestId=" + intentRequest.requestId +
//         ", sessionId=" + session.sessionId);

//     var intent = intentRequest.intent,
//         intentName = intentRequest.intent.name;

//     // Dispatch to your skill's intent handlers
//     if ("Therapy" === intentName) {
//         getTherapyResponse(intent, session, callback);
//         // setColorInSession(intent, session, callback);
//     } else if ("AMAZON.HelpIntent" === intentName) {
//         getWelcomeResponse(callback);
//     } else {
//         throw "Invalid intent";
//     }
// }

// /**
//  * Called when the user ends the session.
//  * Is not called when the skill returns shouldEndSession=true.
//  */
// function onSessionEnded(sessionEndedRequest, session) {
//     console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
//         ", sessionId=" + session.sessionId);
//     // Add cleanup logic here
// }

// // --------------- Functions that control the skill's behavior -----------------------

// function getWelcomeResponse(callback) {
//     // If we wanted to initialize the session to have some attributes we could add those here.
//     var sessionAttributes = {};
//     var cardTitle = "Welcome";
//     var speechOutput = "Hi, how are you feeling today?";
//     // If the user either does not reply to the welcome message or says somethiung that is not
//     // understood, they will be prompted again with this text.
//     var repromptText = "Please tell me how you are feeling";
//     var shouldEndSession = false;

//     callback(sessionAttributes,
//         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
// }

// /**
//  * Sets the color in the session and prepares the speech to reply to the user.
//  */
// function getTherapyResponse(intent, session, callback) {
//     var issueSlot = intent.slots.Issue;

//     if (issueSlot) {
//         var issue = issueSlot.value;
//         analyzeIssue(issue, callback);
//     } else {
//         speechOutput = "I'm not sure what you said. Please try again";
//         repromptText = "I'm not sure what you said. Please try again";
        
//         callback({}, buildSpeechletResponse("Thearpy Response", speechOutput, repromptText, false));
//     }

// }

// function analyzeIssue(issue, callback){
//     speechOutput = "Okay, what I hear you saying is: " + issue + "."
//     repromptText = "How else are you feeling?";


//     // var getSentimentResponse =  function(){
//     //     var onSentimentResponse = function(res) { 
//     //         // console.log("Sentiment: " + res);
//     //         speechOutput = res > .5 ? "You sound happy." : "You sound sad.";
//     //         // console.log(response);
//     //         getKeywordsResponse();
//     //     }
//     //     var logError = function(err) { 
//     //         speechOutput = "I didn't understand."
//     //         repromptText = "Could you please rephrase that?";
//     //     }

//     //     indico.sentiment(input)
//     //         .then(onSentimentResponse)
//     //         .catch(logError);
//     // }

//     // var getKeywordsResponse = function(){
//     //     var tagger = new pos.Tagger();

//     //     var onKeywordResponse = function(keywords) {
//     //         var taggedWords = tagger.tag(_.keys(keywords));
//     //         var topics = [];

//     //         _.each(taggedWords, function(item) {
//     //             var word = item[0];
//     //             topics.push({
//     //                 word: word,
//     //                 pos: item[1],
//     //                 confidence: keywords[word]
//     //             });
//     //         });
//     //         // console.log(topics);
//     //         var nouns = _.filter(topics, function(topic) {
//     //             return topic.pos === "NN";
//     //         });
//     //         nouns = _.sortBy(nouns, function(noun) {return noun.confidence;});

//     //         speechOutput += "Tell me more about the " + nouns[0].word;
//     //         finish();
//     //     }

//     //     indico.keywords(input, {version:2})
//     //         .then(onKeywordResponse)
//     //         .catch(logError);
//     // }

//     var finish = function (){
//         callback({}, buildSpeechletResponse("Therapy Response", speechOutput, repromptText, false));
//     }

//     finish();

//     // getSentimentResponse();
// }

// // --------------- Helpers that build all of the responses -----------------------

// function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
//     return {
//         outputSpeech: {
//             type: "PlainText",
//             text: output
//         },
//         card: {
//             type: "Simple",
//             title: "SessionSpeechlet - " + title,
//             content: "SessionSpeechlet - " + output
//         },
//         reprompt: {
//             outputSpeech: {
//                 type: "PlainText",
//                 text: repromptText
//             }
//         },
//         shouldEndSession: shouldEndSession
//     };
// }

// function buildResponse(sessionAttributes, speechletResponse) {
//     return {
//         version: "1.0",
//         sessionAttributes: sessionAttributes,
//         response: speechletResponse
//     };
// }

