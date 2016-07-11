var T = require('timbre')

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
    generateInterval({
      env: env,
      interval: baseInterval * currentRhythm,
      volume: 0.2,
      freq: freqs[i]
    })
	}
}

function generateInterval (opts) {
  var sin = T('PluckGen', {env: opts.env, mul: opts.volume})

  var inter = T('interval', {interval: opts.interval}, function () {
    sin.noteOnWithFreq(opts.freq, 80)
  }).set({buddies: sin})

  inter.start()
}

module.exports = timbrePoly
