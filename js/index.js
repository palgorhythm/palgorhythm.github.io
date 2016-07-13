import $ from 'jquery'
import formToObject from 'form-to-object'
import timbrePoly from './timbre-poly.js'

$('body').fadeIn({ duration: 3000, easing: 'swing' })

$('#start').click(timbrePoly)
$('#stop').click(() => (location.reload()))

$('#form').submit(function (e) {
  e.preventDefault()
  $('#start').hide()
  $('#stop').show()
  var opts = formToObject(this)
  timbrePoly(opts)
})

$('#form').trigger('submit')
