var $ = require('jquery')
var formToObject = require('form-to-object')
var timbrePoly = require('./timbre-poly.js')

$('#start').click(timbrePoly)
$('#stop').click(location.reload)

$('#form').submit(function (e) {
  e.preventDefault()

  $('#start').hide()
  $('#stop').show()

  var opts = formToObject(this)

  timbrePoly(opts)

  $('#description').html(opts.levels + ' levels of ' + opts.A + ':' + opts.B + ' polyrhythm  at ' + opts.bpm + ' BPM')
})
