//console colours
var	blue  	= '\033[34m',
	green 	= '\033[32m',
	red   	= '\033[31m',
	yellow 	= '\033[33m',
	reset 	= '\033[0m';
	
//console variables
var totalNumber = 0,
	totalMUFC 	= 0,
	totalCFC 	= 0;


console.log(blue+'Twitter Scrum App Starting');

var express = require('express')
,	http 	= require('http')
,	app 	= express()
,	Twit	= require('twit')
,	server 	= http.createServer(app)
,	io		= require('socket.io').listen(server);

app.configure('development', function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.use(express.logger());
});

app.configure('production', function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler());
});

server.listen(process.env.PORT || 8080, function (err) {
  if (err) {
    throw err;
  }

  console.log(green+'info: '+reset+'Express server started on '+yellow+'%s:'+yellow+'%s'+reset+'.', server.address().address, server.address().port);
  console.log(green+'info: '+reset+'App running in '+yellow+process.env.NODE_ENV+reset+' mode.');
  
  processMode = process.env.NODE_ENV;
});

var T = new Twit({
    consumer_key:         'cNHlEqJVNtR77McnTRK1w'
  , consumer_secret:      'bDSkcTrSkpox27J3rOhNhvz8NH4cgbI4qFkWUTpwplU'
  , access_token:         '311722405-2jPxV0CqF5DeD2tdS6bt3G0nyc1WQtvCcR3APM9R'
  , access_token_secret:  'bI58z5h3Kaf4P4DqbWqxpZo38zgcsRkchjr5pHlw10'
});

var stream = T.stream('statuses/filter', {track: ['#cfc','#mufc']});

io.configure(function(){
        io.enable('browser client minification');  // send minified client
        io.enable('browser client etag');          // apply etag caching logic based on version number
        io.enable('browser client gzip');          // gzip the file
        io.set('log level', 1);                    // reduce logging
});

io.on('connection', function(socket){
	socket.emit('processMode', process.env.NODE_ENV);
	
	var tweetNumbersObject = new tweetNumbers(totalNumber,totalMUFC,totalCFC);
	socket.emit('tweetNumbers', tweetNumbersObject);

	stream.on('tweet', function (tweet) {
		if(tweet.entities.hashtags.contains('cfc')) {
			totalNumber ++;
			totalCFC ++;
			socket.emit('tweet', totalCFC, totalMUFC, totalNumber);
		}
	
		if(tweet.entities.hashtags.contains('mufc')) {
			totalNumber ++;
			totalMUFC ++;
			socket.emit('tweet', totalCFC, totalMUFC, totalNumber);
		}
	});
});

function tweetNumbers(totalNumber,totalMUFC, totalCFC){
	this.totalNumber=totalNumber;
	this.totalMUFC=totalMUFC;
	this.totalCFC=totalCFC;
}



Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i].text.toLowerCase() === obj) {
            return true;
        }
    }
    return false;
}