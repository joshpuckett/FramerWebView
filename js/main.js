// Copyright 2014, Josh Puckett

// Set up vars
togglePhone = true;
toggleHand = true;
toggleZoom = false;
isRetina = window.devicePixelRatio > 1;
isiPhone = true;
var backgrounds = [
									"",
									"https://s3-us-west-2.amazonaws.com/tweakapp.co/Framewebview/_bgs/bg1.png",
									"https://s3-us-west-2.amazonaws.com/tweakapp.co/Framewebview/_bgs/bg2.png",
									];
currentBackground = 0;

function prototypeViewer() {
	//Set up some object vars based on if zoom has been toggled
	//and if device is retina or not
	if (!toggleZoom) {
		viewerHeight = ($(window).height() * .8);
		viewerWidth = viewerHeight * .48588;
		viewerScale = viewerHeight/1630;
	} else {
	 	viewerHeight = isRetina ? 1630/2 : 1630;
		viewerWidth = isRetina ? 792/2 : 792;
		viewerScale = isRetina ? 0.5 : 1;
	}

	//Private object vars
	var positionLeft = isiPhone ? 75 : 35;
	var positionTop = isiPhone ? 247 : 164;
	var deviceMultiple = isiPhone ? 1.3 : 1.375;
	var deviceLeftMultiple = isiPhone ? 1.352 : 1.433;
	var deviceTopMultiple = isiPhone ? 1.27 : 1.33;

	//Set up viewer
	$('#viewer').css({
		"height": viewerHeight,
		"width": viewerWidth,
		"position": 'absolute',
		"left": ($(window).width() - viewerWidth)/2,
    "top": ($(window).height() - viewerHeight)/2,
	});

	//Set up viewer iframe
	$('#frame').css({
		'webkitTransform': 'scale(' + viewerScale + ', ' + viewerScale + ')',
		'webkitTransformOrigin': '0% 0%',
		'position': 'absolute',
		'left': positionLeft * viewerScale,
		'top': positionTop * viewerScale,
	});

	//Set up hand
	$('#hand').css({
		'height': ((1833 * deviceMultiple) * viewerScale) * 0.7793,
		'width': (1833 * deviceMultiple) * viewerScale,
		'position': 'absolute',
		'left': ($(window).width() - ((1833 * deviceLeftMultiple) * viewerScale))/2,
    'top': $(window).height() - (((1833 * deviceTopMultiple) * viewerScale) * 0.7793),
	});
}

function setBackground(background) {
	if (background == 0) {
		$('html').css({
	  	"background": "none"
		});
	} else {
		$('html').css({
			  "background": "url('" + backgrounds[background] + "') no-repeat center center fixed",
			  "-webkit-background-size": "cover",
		  	"-moz-background-size": "cover",
		  	"-o-background-size": "cover",
		  	"background-size": "cover"
		});
	}
}

// Keypress listeners.
$(window).keypress(function(e) {
	switch (e.which) {
		// Hitting the P key toggles between black and white iPhone
		case 112:
			$('#viewer').css({
				"background-image": togglePhone ? "url('img/iphone_black.png')" : "url('img/iphone_white.png')"
			});
			togglePhone = !togglePhone;
			break;
		// Hitting the H key toggles the hand on and off
		case 104:
			$('#hand').css({
				"background-image": toggleHand ? "none" : "url('img/hand.png')"
			});
			toggleHand = !toggleHand;
			break;
		// Hitting the B key cycles through various backgrounds
		case 98:
			if (currentBackground == backgrounds.length-1) {
				currentBackground = 0;
				setBackground(currentBackground);
			} else {
				currentBackground += 1;
				setBackground(currentBackground);
			}
			break;
		// Hitting the Z key zooms the viewer to 100% scale
		case 122:
			toggleZoom = !toggleZoom;
			prototypeViewer();
			break;
	}
});

// Kick things off and update on resize
$(document).ready(prototypeViewer);
$(window).resize(prototypeViewer);

function search(ele) {
  if(event.keyCode == 13) {
		$("#frame").attr("src", ele.value);
		$('.prototypeinput').blur();
  }
}

$("#iphone, #android").click(function(){
if (isiPhone) {
	isiPhone = !isiPhone;
	$('#iphone').addClass("iphone").removeClass("iphoneactive");
	$('#android').addClass("androidactive").removeClass("android");
	$('#viewer').css({
		"background-image": "url('img/nexus.png')"
	});
	$('iframe').css({
		"width": "720px",
		"height": "1280px"
	});
	prototypeViewer();
} else {
	isiPhone = !isiPhone;
	$('#iphone').addClass("iphoneactive").removeClass("iphone");
	$('#android').addClass("android").removeClass("androidactive");
	$('#viewer').css({
		"background-image": "url('img/iphone_white.png')"
	});
	$('iframe').css({
		"width": "640px",
		"height": "1136px"
	});
	prototypeViewer();
}
});


$("#controls").mouseenter(function(){
	$("#controls").animate({opacity:'1'}, 'fast');
});
$("#controls").mouseleave(function(){
  $("#controls").animate({opacity:'0.1'}, 'slow');
});
