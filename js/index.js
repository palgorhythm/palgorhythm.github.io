var $ = require('jquery')
var formToObject = require('form-to-object')
var timbrePoly = require('./timbre-poly.js')

$('#overlay').fadeOut({
  duration: 3000,
  easing: 'swing'
})
resizeInput($('.form-field'))

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

$('.form-field').on('keypress keyup keydown change', function () {
  resizeInput($(this))
})

function resizeInput ($input) {
  $input.css({
    width: ($input.val().length + 1) * parseInt($input.css('font-size'), 10) + 'px'
  })
}
