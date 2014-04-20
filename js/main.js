// Copyright 2014, Josh Puckett

$(function() {

// Set up vars
var defaults = {
	phoneColor: "white",		// "white" or "black"
	hand: true,
	zoom: false,
	isRetina: (window.devicePixelRatio > 1),
	device: "iphone",				// "iphone" or "android"
	background: 0,
	url: "https://s3-us-west-2.amazonaws.com/tweakapp.co/Framewebview/lightbox/index.html"
};

var backgrounds = [
	"",
	"https://s3-us-west-2.amazonaws.com/tweakapp.co/Framewebview/_bgs/bg1.png",
	"https://s3-us-west-2.amazonaws.com/tweakapp.co/Framewebview/_bgs/bg2.png",
];

// Copy defaults to an options object
var options = {};
$.map(defaults, function(value, key){
	options[key] = value;
});

// Fetch GET parameters, apply over options object
var params = window.location.search.substring(1).split("&");
$.map(params, function(param){
	var key_value_pair = param.split('=');

	// Ensure URLs and booleans are properly formatted
	var value = decodeURIComponent(key_value_pair[1]);
	value = (value === "true") ? true : value;
	value = (value === "false") ? false : value;

	options[key_value_pair[0]] = value;
});

// Compares current settings to defaults, updates address bar to reflect delta
var updateAddressBar = function(){
	var paramString = "?";
	$.map(defaults, function(value, key){
		if (options[key] != value){
			paramString += key + "=" + options[key] + "&";
		}
	});
	window.history.pushState({}, "Frameview", window.location.pathname + paramString.slice(0, -1));
}

function prototypeViewer() {

	setBackground();
	setPhoneColor();
	setHand();
	setURL();

	//Set up some object vars based on if zoom has been toggled
	//and if device is retina or not
	if (!options.zoom) {
		viewerHeight = ($(window).height() * .8);
		viewerWidth = viewerHeight * .48588;
		viewerScale = viewerHeight/1630;
	} else {
	 	viewerHeight = options.isRetina ? 1630/2 : 1630;
		viewerWidth = options.isRetina ? 792/2 : 792;
		viewerScale = options.isRetina ? 0.5 : 1;
	}

	//Private object vars
	var isiPhone = (options.device == "iphone");
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
	options.background = (background != undefined) ? background : options.background;
	if (options.background > backgrounds.length-1){
		options.background = 0;
	}
	if (options.background == 0) {
		$('html').css({
	  	"background": "none"
		});
	} else {
		$('html').css({
			  "background": "url('" + backgrounds[options.background] + "') no-repeat center center fixed",
			  "-webkit-background-size": "cover",
		  	"-moz-background-size": "cover",
		  	"-o-background-size": "cover",
		  	"background-size": "cover"
		});
	}
}

var setPhoneColor = function(phoneColor){
	options.phoneColor = (phoneColor != undefined) ? phoneColor : options.phoneColor;

	var phoneColors = {
		"white": "url('img/iphone_white.png')",
		"black": "url('img/iphone_black.png')"
	};

	if (options.device == "iphone"){
		$('#viewer').css({
			"background-image": phoneColors[options.phoneColor] || phoneColors["white"]
		});
	}

};

var setHand = function(hand){
	options.hand = (hand != undefined) ? hand : options.hand;
	$('#hand').css({
		"background-image": !options.hand ? "none" : "url('img/hand.png')"
	});
};

var setURL = function(url){
	options.url = (url != undefined) ? url : options.url;
	$('.prototypeinput').val(options.url);
	$("#frame").attr("src", options.url);
}

var setDevice = function(device){
	options.device = (device != undefined) ? device : options.device;

	if (options.device == "iphone"){
		$('#iphone').addClass("iphoneactive").removeClass("iphone");
		setPhoneColor();
		$('iframe').css({ "width": "640px", "height": "1136px" });
	}else{
		$('#iphone').addClass("iphone").removeClass("iphoneactive");
	}

	if (options.device == "android"){
		$('#android').addClass("androidactive").removeClass("android");
		$('#viewer').css({
			"background-image": "url('img/nexus.png')"
		});
		$('iframe').css({ "width": "720px", "height": "1280px" });
	}else{
		$('#android').addClass("android").removeClass("androidactive");
	}

	prototypeViewer();
}

// Keypress listeners.
$(window).keypress(function(e) {
	switch (e.which) {
		// Hitting the P key toggles between black and white iPhone
		case 112:
			setPhoneColor((options.phoneColor == "white") ? "black" : "white" );
			updateAddressBar();
			break;
		// Hitting the H key toggles the hand on and off
		case 104:
			setHand(!options.hand);
			updateAddressBar();
			break;
		// Hitting the B key cycles through various backgrounds
		case 98:
			setBackground(options.background + 1);
			updateAddressBar();
			break;
		// Hitting the Z key zooms the viewer to 100% scale
		case 122:
			options.zoom = !options.zoom;
			updateAddressBar();
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
		updateAddressBar();
  }
}


// Needs to be called once on initialize
setDevice();

$("#iphone, #android").click(function(){
	if (options.device == "iphone"){
		setDevice("android");
	}else{
		setDevice("iphone");
	}
});


$("#controls").mouseenter(function(){
	$("#controls").animate({opacity:'1'}, 'fast');
});
$("#controls").mouseleave(function(){
  $("#controls").animate({opacity:'0.1'}, 'slow');
});


});
