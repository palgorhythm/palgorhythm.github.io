import $ from "jquery";
import range from "lodash.range";
import timbreFunc from "./timbreMod.js";

let T;
document.body.addEventListener("click", () => {
  timbreFunc();
  T = timbre;
});

const colors = [
  "#F5BF16",
  "#5CBAEB",
  "#FF385C",
  "#A1EF8B",
  "#59EAE6",
  "#BDD4DE",
  "#FF530D",
  "#06D6A0"
];

class Interval {
  constructor(opts) {
    this.container = $("form");
    this.opts = opts;
    this.$dots = this._generateDots();
    this.counter = 0;
    this.inter = 0;
    this.env = T("perc", { a: 50, r: 2500 });
  }

  start() {
    var sin = T("PluckGen", { env: this.env, mul: this.opts.volume });

    this.inter = T("interval", { interval: this.opts.interval }, () => {
      sin.noteOnWithFreq(this.opts.freq, 80);
      var currentIndex = this.counter % this.$dots.length;
      this._showDot(currentIndex);
      this.counter++;
    }).set({ buddies: sin });

    this.inter.start();
  }

  stop() {
    this.inter.stop();
  }

  // 'private'

  _generateDots() {
    let size;
    let startRadius;
    if (this.container.width() > 50) {
      startRadius = this.container.width() / 1.6;
      size = 100 / this.opts.numDotsForThisFreq;
      size < 2 ? (size = 2) : null;
    } else {
      size = 100 / this.opts.numDotsForThisFreq;
      startRadius = this.container.width() / 1.3 + size;
      size < 2 ? (size = 2) : null;
    }
    console.log(size);

    const radiusInterval = size * 2;

    const numOfFreqs = this.opts.levels + 1,
      degreeInterval = (2 * Math.PI) / numOfFreqs;
    const centerCoords = {
      x: this.container.width() / 2,
      y: this.container.height() / 2
    };
    let numOfDotsPerFreq = this.opts.numDotsForThisFreq;
    numOfDotsPerFreq > 100 ? (numOfDotsPerFreq = 100) : null;

    return range(numOfDotsPerFreq).map(i => {
      const coords = {
        x:
          (startRadius + i * radiusInterval) *
            Math.cos(degreeInterval * this.opts.id) +
          centerCoords.x -
          size / 2,
        y:
          (startRadius + i * radiusInterval) *
            Math.sin(degreeInterval * this.opts.id) +
          centerCoords.y -
          size / 2
      };

      const $dot = $('<div class="dot"></div>').css({
        top: coords.y,
        right: coords.x,
        width: size,
        height: size
      });
      this.container.append($dot);
      return $dot.css({ backgroundColor: colors[this.opts.id] });
    });
  }

  _showDot(currentIndex) {
    this.$dots.forEach(($dot, i, arr) => {
      i <= currentIndex ? $dot.show() : $dot.hide();
    });
  }
}

export default Interval;
