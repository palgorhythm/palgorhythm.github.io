var $ = require('jquery')
var T = require('timbre')

var timbrePoly = function () {
	document.getElementById("start").style.visibility = 'hidden';
	document.getElementById("stop").style.visibility = 'visible';

	ratio = [parseInt(document.getElementById("form").elements[1].value),parseInt(document.getElementById("form").elements[3].value)]; //input
	levels = parseInt(document.getElementById("form").elements[5].value); //input: up to 6
	BPM = parseInt(document.getElementById("form").elements[7].value); //input

	//var myWindow = window.open("", "MsgWindow", "width=400, height=100");
	document.getElementById('description').innerHTML = levels+" levels of "+ratio[0]+":"+ratio[1]+" polyrhythm  at "+BPM+ " BPM";

	//ratio = [3,2];
	//levels = 2;
	//BPM = 100;
	var currentRhythm;
	var intervals = [];
	var freqs = [];
	timbre.bpm = BPM;
	var baseInterval= (60/BPM)*1000.0/Math.pow(ratio[0],levels);
	var c = 0;
	var volumes = [];
	var base = 200;

	//freqs = [base, (9/8)*base, (81/64)*base, (4/3)*base, (3/2)*base, (27/16)*base,(243/128)*base]; //pythagorean
	freqs = [base, (10/9)*base, (5/4)*base, (4/3)*base, (3/2)*base, (5/3)*base,(15/8)*base];

	for(i = 0;i<=levels;i++)
	{
	    currentRhythm = Math.pow(ratio[0],levels-i)*Math.pow(ratio[1],i);
	    intervals[i] = baseInterval * currentRhythm;
	    //freqs[i] = 150*(i+1);
	    volumes[i] = 0.2
	}

	for(i = levels+1; i<7;i++)
	{
	    intervals[i] = 100;
	    freqs[i] = 100;
	    volumes[i] = 0

	}

	var env = T("perc", {a:50, r:2500});
	var sin0 = T("PluckGen", {env:env, mul:volumes[0]});
	var sin1 = T("PluckGen", {env:env, mul:volumes[1]});
	var sin2 = T("PluckGen", {env:env, mul:volumes[2]});
	var sin3 = T("PluckGen", {env:env, mul:volumes[3]});
	var sin4 = T("PluckGen", {env:env, mul:volumes[4]});
	var sin5 = T("PluckGen", {env:env, mul:volumes[5]});
	var sin6 = T("PluckGen", {env:env, mul:volumes[6]});

	var inter0 = T("interval", {interval:intervals[0]}, function() {
	    sin0.noteOnWithFreq(freqs[0], 80);
	}).set({buddies:sin0});

	var inter1 = T("interval", {interval:intervals[1]}, function() {
	    sin1.noteOnWithFreq(freqs[1], 80);
	}).set({buddies:sin1});

	var inter2 = T("interval", {interval:intervals[2]}, function() {
	    sin2.noteOnWithFreq(freqs[2], 80);
	}).set({buddies:sin2});

	var inter3 = T("interval", {interval:intervals[3]}, function() {
	    sin3.noteOnWithFreq(freqs[3], 80);
	}).set({buddies:sin3});

	var inter4 = T("interval", {interval:intervals[4]}, function() {
	    sin4.noteOnWithFreq(freqs[4], 80);
	}).set({buddies:sin4});

	var inter5 = T("interval", {interval:intervals[5]}, function() {
	    sin5.noteOnWithFreq(freqs[5], 80);
	}).set({buddies:sin5});

	var inter6 = T("interval", {interval:intervals[6]}, function() {
	    sin6.noteOnWithFreq(freqs[6], 80);
	}).set({buddies:sin6});

	inter0.start();
	inter1.start();
	inter2.start();
	inter3.start();
	inter4.start();
	inter5.start();
	inter6.start();
}

function reset() {
	location.reload();
}

$('#start').click(function (e) {
  timbrePoly()
})

$('#start').trigger('click')

$('#stop').click(function (e) {
  reset()
})
