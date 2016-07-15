import $ from 'jquery'
import formToObject from 'form-to-object'
import timbrePoly from './timbre-poly.js'
import queryString from 'query-string'
import empty from 'is-empty'
import isMobile from 'ismobilejs'

if (isMobile.any) { $('#mobile-device-warning').show() }

var params = queryString.parse(location.search)
if (!empty(params)) {
  $('#levels').val(params.levels)
  $('#A').val(params.A)
  $('#B').val(params.B)
  $('#bpm').val(params.bpm)
}

$('body').fadeIn({ duration: 3000, easing: 'swing' })

$('#form').submit(function (e) {
  e.preventDefault()
  $('#start').hide()
  $('#stop').show()
  var opts = formToObject(this)
  timbrePoly(opts)
})

$('#stop').click(() => {
  var form = $('#form')[0]
  var opts = formToObject(form)
  var searchParams = queryString.stringify(opts)
  location.search = searchParams
})
