var totalNumber = 0,
	totalMUFC 	= 0,
	totalCFC 	= 0,
	CFpercentage,
	CFpercentage,
	processMode;

//var socket = io.connect('http://localhost:8080');
var socket = io.connect();

socket.on('processMode', function(mode) {
	processMode = mode;
});

socket.on('tweetNumbers', function(tweetNumbers) {
	if(processMode == 'development') {
		console.log(tweetNumbers);
	}
	totalNumber 	= tweetNumbers.totalNumber,
	totalMUFC 		= tweetNumbers.totalMUFC,
	totalCFC 		= tweetNumbers.totalCFC,
	CFpercentage 	= Math.round(((totalCFC/totalNumber)*100)),
	MUpercentage 	= Math.round(((totalMUFC/totalNumber)*100)),
	$right 			= $('.right'),
	$left 			= $('.left');
	
	$('.left').css('width',CFpercentage + '%');
	$('.right').css('width',MUpercentage + '%');
	$('.left p').css('font-size',CFpercentage + 'px');
	$('.right p').css('font-size',MUpercentage + 'px');
	$('.left p.amount').text(totalCFC);
	$('.right p.amount').text(totalMUFC);
});

$(document).ready(function() {
	$right = $('.right');
	$left = $('.left');
	
	socket.on('tweet', function(totalCFC, totalMUFC, totalNumber){
		totalNumber = totalNumber,
		totalCFC = totalCFC,
		totalMUFC = totalMUFC,
		CFpercentage = Math.round(((totalCFC/totalNumber)*100)),
		MUpercentage = Math.round(((totalMUFC/totalNumber)*100));
				
		$('.left').animate({width: CFpercentage + '%'}, 1000, 'easeOutBounce');
		$('.right').animate({width: MUpercentage + '%'}, 1000, 'easeOutBounce');
		$('.left p').css('font-size',CFpercentage + 'px');
		$('.right p').css('font-size',MUpercentage + 'px');
		$('.left p.amount').text(totalCFC);
		$('.right p.amount').text(totalMUFC);
	});
});

var red = '#c20000'; //white text
var yellow = '#ffcc00'; //green text #006e00;
