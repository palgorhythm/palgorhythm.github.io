import T from 'timbre'
import $ from 'jquery'
import range from 'lodash.range'

var colors = ['#F5BF16', '#5CBAEB', '#FF385C', '#323B4A', '#59EAE6', '#BDD4DE', '#FF530D', '#3F5765']
var $body = $('body')
var env  = T('perc', {a: 50, r: 2500})

class Interval {
  constructor (opts) {
    this.opts = opts
    this.$dots = this._generateDots()
    this.counter = 0
  }

  start () {
    var sin = T('PluckGen', {env: env, mul: this.opts.volume})

    var inter = T('interval', {interval: this.opts.interval}, () => {
      sin.noteOnWithFreq(this.opts.freq, 80)
      var currentIndex = this.counter % this.$dots.length
      this._showDot(currentIndex)
      this.counter++
    }).set({buddies: sin})

    inter.start()
  }

  // 'private'

  _generateDots () {
    var size = 5, startRadius = 120, radiusInterval = size * 2

    var numOfFreqs = this.opts.levels + 1, degreeInterval = 2 * Math.PI / numOfFreqs
    var centerCoords = { x: $body.width() / 2, y: $body.height() / 2 }

    var numOfDotsPerFreq
    var windowWidth = $(window).width()
    if      (windowWidth < 450) { numOfDotsPerFreq = 5  }
    else if (windowWidth < 700) { numOfDotsPerFreq = 10 }
    else                        { numOfDotsPerFreq = 20 }

    return range(numOfDotsPerFreq).map((i) => {
      var coords = {
        x: (startRadius + i * radiusInterval) * Math.cos(degreeInterval * this.opts.id) + centerCoords.x - size / 2,
        y: (startRadius + i * radiusInterval) * Math.sin(degreeInterval * this.opts.id) + centerCoords.y - size / 2
      }

      var $dot = $('<div class="dot"></div>').css({
        top: coords.y,
        right: coords.x,
        width: size,
        height: size
      })
      $('body').append($dot)
      return $dot.css({ backgroundColor: colors[this.opts.id] })
    })
  }

  _showDot (currentIndex) {
    this.$dots.forEach(($dot, i, arr) => {
      i <= currentIndex ? $dot.show() : $dot.hide()
    })
  }
}

export default Interval
