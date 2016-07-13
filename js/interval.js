import T from 'timbre'
import $ from 'jquery'

var colors = ['#F5BF16', '#5CBAEB', '#FF385C', '#323B4A', '#59EAE6', '#BDD4DE', '#FF530D', '#3F5765']
var $body = $('body')
var env  = T('perc', {a: 50, r: 2500})

class Interval {
  constructor (opts) {
    this.opts = opts
    this.$dot = this._generateDot(opts.id)
  }

  start () {
    var sin = T('PluckGen', {env: env, mul: this.opts.volume})

    var inter = T('interval', {interval: this.opts.interval}, () => {
      sin.noteOnWithFreq(this.opts.freq, 80)
    }).set({buddies: sin})

    inter.start()
  }

  // 'private'

  _generateDot (id) {
    var radius = 200, numOfDots = this.opts.levels + 1, degreeInterval = 2 * Math.PI / numOfDots
    var centerCoords = { x: $body.width() / 2, y: $body.height() / 2 }
    var coords = {
      x: 200 * Math.cos(degreeInterval * id) + centerCoords.x,
      y: 200 * Math.sin(degreeInterval * id) + centerCoords.y
    }

    var $dot = $('<div class="dot"></div>').css({ top: coords.y, right: coords.x, })
    $('body').append($dot)
    return $dot.css({ backgroundColor: colors[this.opts.id] })
  }
}

export default Interval
