var $ = require('jquery')
var formToObject = require('form-to-object')
var timbrePoly = require('./timbre-poly.js')

$('body').fadeIn({ duration: 3000, easing: 'swing' })

$('#start').click(timbrePoly)
$('#stop').click(function () {
  location.reload()
})

$('#form').submit(function (e) {
  e.preventDefault()
  $('#start').hide()
  $('#stop').show()
  var opts = formToObject(this)
  timbrePoly(opts)
})

$('#form').trigger('submit')
