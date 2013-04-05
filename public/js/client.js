//var socket = io.connect('http://localhost:8080');
var socket = io.connect();

var totalNumber = 0,
	totalMUFC 	= 0,
	totalCFC 	= 0,
	$percentageOfCFC,
	$percentageOfMUFC;

$(document).ready(function() {
	$right = $('.right');
	$left = $('.left');

	socket.on('tweet', function(tweet){
		//console.log(tweet.entities.hashtags[0].text);
		for (var i=0;i<tweet.entities.hashtags.length;i++) {
			if(tweet.entities.hashtags[i].text.toLowerCase() == 'cfc') {
				totalNumber ++;
				totalCFC ++;
				//console.log('cfc');
				CFpercentage = ((totalCFC/totalNumber)*100);
				MUpercentage = ((totalMUFC/totalNumber)*100);
				
				console.log('CFC Tweet: MU ' + MUpercentage + '% CF ' + CFpercentage + '%');
				$('.left').css('width',CFpercentage + '%');
				$('.right').css('width',MUpercentage + '%');
			}
	
			if(tweet.entities.hashtags[i].text.toLowerCase() == 'mufc') {
				totalNumber ++;
				totalMUFC ++;
				//console.log('mufc');
				
				CFpercentage = ((totalCFC/totalNumber)*100);
				MUpercentage = ((totalMUFC/totalNumber)*100);
				
				console.log('MUFC Tweet: MU ' + MUpercentage + '% CF ' + CFpercentage + '%');
				$('.left').css('width',CFpercentage + '%');
				$('.right').css('width',MUpercentage + '%');
			}
		}
	});
});

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i].toLowerCase() === obj) {
            return true;
        }
    }
    return false;
}

var red = '#c20000'; //white text
var yellow = '#ffcc00'; //green text #006e00;
