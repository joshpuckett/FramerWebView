// Copyright 2014, Josh Puckett
// All this code is pretty sloppy, consider it an early alpha, 
// with many improvements to come :)

// Set up vars
togglePhone = true
toggleHand = true
var backgrounds = [
									"", 
									"https://dl.dropboxusercontent.com/u/144234624/_bgs/bg1.png", 
									"https://dl.dropboxusercontent.com/u/144234624/_bgs/bg2.png",
									] 
currentBackground = 0


function centerAndResizeViewer() {
	viewerHeight = ($(window).height() * .8)
	viewerWidth = viewerHeight * .48588
	viewerScale = viewerHeight/1630
	$('#viewer').css({
		'height': viewerHeight,
		'width': viewerWidth,
		'position': 'absolute',
		'left': ($(window).width() - viewerWidth)/2,
    'top': ($(window).height() - viewerHeight)/2,
	})
	$('#frame').css({
		'webkitTransform': 'scale(' + viewerScale + ', ' + viewerScale + ')',
		'webkitTransformOrigin': '0% 0%',
		'position': 'absolute',
		'left': 75 * viewerScale,
    'top': 247 * viewerScale,
	})
	$('#hand').css({
		'height': ((1833 * 1.30) * viewerScale) * 0.7793,
		'width': (1833 * 1.30) * viewerScale,
		'position': 'absolute',
		'left': ($(window).width() - ((1833 * 1.352) * viewerScale))/2,
    'top': $(window).height() - (((1833 * 1.27) * viewerScale) * 0.7793),
	})
}

function setBackground(background) {
	if (background == 0) {
		$('html').css({ 
	  	"background": "none"
		})
	} else {
		$('html').css({ 
			  "background": "url('" + backgrounds[background] + "') no-repeat center center fixed",
			  "-webkit-background-size": "cover",
		  	"-moz-background-size": "cover",
		  	"-o-background-size": "cover",
		  	"background-size": "cover"
			})
	}
}

// Keypress listeners. 
// Hitting the P key toggles between black and white iPhone
// Hitting the H key toggles the hand on and off
// Hitting the B key cycles through various backgrounds
$('body').keypress(function(e) {
	if (e.which == 112) {
		$('#viewer').css({
			"background-image": togglePhone ? "url('img/iphone_black.png')" : "url('img/iphone_white.png')"
		})
		togglePhone = !togglePhone
	} else if (e.which == 104) {
		$('#hand').css({
			"background-image": toggleHand ? "none" : "url('img/hand.png')"
		})
		toggleHand = !toggleHand
	} else if (e.which == 98) {
		if (currentBackground == backgrounds.length-1) {
			currentBackground = 0
			setBackground(currentBackground)
		} else {
			currentBackground += 1
			setBackground(currentBackground)
		}
	}
});

// Kick things off
$(document).ready(centerAndResizeViewer)
$(window).resize(centerAndResizeViewer)

