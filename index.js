//initialize express
var express = require('express');

// //initialize alexa-app
// var alexa = require('alexa-app');
// var alexaApp = new alexa.app('alexa-therapy');

// //initialize body-parser
var bodyParser = require('body-parser');

// //initialize the app and set the port
var app = express();

app.set('port', (process.env.PORT || 5000));
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.set('view engine','ejs');


// create and assign our Alexa App instance to an address on express, in this case https://hey-dad.herokuapp.com/api/hey-dad
// var alexaApp = new alexa.app('alexa-therapy');
// alexaApp.express(app, "/api/");

//make sure we're listening on the assigned port
app.listen(app.get('port'), function() {

    console.log("Node app is running at localhost:" + app.get('port'));

});

var _ = require('underscore');
var pos = require('pos');
var indico = require("indico.io");
indico.apiKey = '1bc005ab5acedb138d371dc703242b4a';


// //our intent that is launched when "Hey Alexa, open Hey Dad" command is made
// //since our app only has the one function (tell a bad joke), we will just do that when it's launched
// alexaApp.launch(function(request,response) {
//     //log our app launch
//     console.log("App launched"); 
//     response.say("Welcome");
//     response.send();
// });

app.get('/hello', function(req, res) {
  res.send('hello');
});

app.post('/test', function(req, res) {
    // console.log(req.body)
    var issue = req.body.issue;
    var response = {
        "response" : issue
    }
  res.json(JSON.stringify(response));
});

// alexa.intent('number',
//   {
//     "slots":{"number":"NUMBER"}
//     ,"utterances":[ "say the number {1-100|number}" ]
//   },
//   function(request,response) {
//     var number = request.slot('number');
//     response.say("You asked for the number "+number);
//   }
// );

// // Manually hook the handler function into express 
// express.post('/alexa-therapy',function(req,res) {
//   alexaApp.request(req.body)        // connect express to alexa-app 
//     .then(function(response) { // alexa-app returns a promise with the response 
//       res.json(response);      // stream it to express' output 
//     });
// });
