var totalNumber = 0,
	totalMUFC 	= 0,
	totalCFC 	= 0,
	CFpercentage,
	MUpercentage,
	processMode,
	paper,
	left,
	right;

//var socket = io.connect('http://localhost:8080');
var socket 	= io.connect();


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
	MUpercentage 	= Math.round(((totalMUFC/totalNumber)*100));
});

$(document).ready(function() {
	var paper 	= Raphael($("#container").get(0), "100%","100%");
	var left 	= paper.rect(0, 0, "50%", "100%");
	var right 	= paper.rect("50%", 0, "50%", "100%");
	left.attr("fill", "#007FFF");
	right.attr("fill", "#c20000");
	left.attr("stroke", "#FFF");
	left.attr("stroke-width", "2px");
	right.attr("stroke", "#FFF");
	right.attr("stroke-width", "2px");

	leftText = paper.text("25%", "50%", "#MCFC\n" + totalCFC).attr({fill: '#FFF', "font-size": CFpercentage + 'px'});
	rightText = paper.text("75%", "50%", "#MUFC\n" + totalMUFC).attr({fill: '#DA9100', "font-size": MUpercentage + 'px'});
	
	socket.on('tweet', function(totalCFC, totalMUFC, totalNumber){
		totalNumber = totalNumber,
		totalCFC = totalCFC,
		totalMUFC = totalMUFC,
		CFpercentage = Math.round(((totalCFC/totalNumber)*100)),
		MUpercentage = Math.round(((totalMUFC/totalNumber)*100));
		
		leftText.attr({text: "#MCFC\n" + totalCFC, "font-size": CFpercentage + 'px'});
		rightText.attr({text: "#MUFC\n" + totalMUFC, "font-size": MUpercentage + 'px'});
		left.attr({width: CFpercentage + '%'});
   		leftText.attr({x: CFpercentage/2 + '%'});
   		
   		right.attr({width: MUpercentage + '%', x: CFpercentage + '%'});
   		rightText.attr({width: MUpercentage + '%', x: (CFpercentage + (MUpercentage/2)) + '%'});
	});
});

var red = '#c20000'; //white text
var yellow = '#ffcc00'; //green text #006e00;
