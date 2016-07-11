var T = require('timbre')
var $ = require('jquery')

function timbrePoly (opts) {
	var ratio = [+opts.A, +opts.B]
	var levels = +opts.levels // input: up to 6
	var BPM = +opts.bpm

	var baseInterval = (60/BPM)*1000.0/Math.pow(ratio[0],levels)
	var base = 200
	var freqs = [1, 10/9, 5/4, 4/3, 3/2, 5/3, 15/8].map(function (i) { return i * base })

  var env  = T('perc', {a: 50, r: 2500})

	for(var i = 0; i <= levels; i++) {
    var currentRhythm = Math.pow(ratio[0],levels-i)*Math.pow(ratio[1],i)
    generateInterval({ id: i, levels: levels, env: env, interval: baseInterval * currentRhythm, volume: 0.2, freq: freqs[i] })
	}
}

var colors = ['#F5BF16', '#5CBAEB', '#FF385C', '#323B4A', '#59EAE6', '#BDD4DE', '#FF530D', '#3F5765']
var $body = $('body')

function generateInterval (opts) {
  var sin = T('PluckGen', {env: opts.env, mul: opts.volume})

  var radius = 200, numOfDots = opts.levels + 1, degreeInterval = 2 * Math.PI / numOfDots
  var centerCoords = { x: $body.width() / 2, y: $body.height() / 2 }
  var coords = {
    x: 200 * Math.cos(degreeInterval * opts.id) + centerCoords.x,
    y: 200 * Math.sin(degreeInterval * opts.id) + centerCoords.y
  }

  var $dot = $('<div class="dot"></div>').css({ top: coords.y, right: coords.x, })
  $('body').append($dot)
  $dot.css({ backgroundColor: colors[opts.id] })

  var inter = T('interval', {interval: opts.interval}, function () {
    sin.noteOnWithFreq(opts.freq, 80)
    $dot.show()
    $dot.fadeOut(300)
  }).set({buddies: sin})

  inter.start()
}

module.exports = timbrePoly
