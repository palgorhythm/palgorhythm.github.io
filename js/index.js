var $ = require('jquery')
var T = require('timbre')

function timbrePoly () {
  $('#start').hide()
  $('#stop').show()

	var ratio = [$('#A').val(), $('#B').val()];
	var levels = +$('#levels').val(); // input: up to 6
	var BPM = +$('#bpm').val(); // input

  $('#description').html(levels + ' levels of ' + ratio[0] + ':' + ratio[1] + ' polyrhythm  at ' + BPM + ' BPM')

	var baseInterval = (60/BPM)*1000.0/Math.pow(ratio[0],levels)
	var base = 200

	var freqs = [base, (10/9)*base, (5/4)*base, (4/3)*base, (3/2)*base, (5/3)*base, (15/8)*base]

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

timbrePoly()

function generateInterval (opts) {
  var sin = T('PluckGen', {env: opts.env, mul: opts.volume})

  var inter = T('interval', {interval: opts.interval}, function () {
    sin.noteOnWithFreq(opts.freq, 80)
  }).set({buddies: sin})

  inter.start()
}

function reset () {
	location.reload()
}

$('#start').click(timbrePoly)
$('#stop').click(reset)
