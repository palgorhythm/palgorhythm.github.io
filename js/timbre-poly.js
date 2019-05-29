import $ from "jquery";
import Interval from "./interval.js";

function timbrePoly(opts) {
  var ratio = [+opts.A, +opts.B];
  var levels = +opts.levels; // input: up to 6
  var BPM = +opts.bpm;
  let intervals = [];

  var baseInterval = ((60 / BPM) * 1000.0) / Math.pow(ratio[0], levels);
  var base = 200;
  var freqs = [1, 10 / 9, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 15 / 8].map(function(i) {
    return i * base;
  });

  for (var i = 0; i <= levels; i++) {
    var currentRhythm = Math.pow(ratio[0], levels - i) * Math.pow(ratio[1], i);
    var interval = new Interval({
      id: i,
      levels: levels,
      interval: baseInterval * currentRhythm,
      volume: 0.2,
      freq: freqs[i]
    });
    interval.start();
    intervals.push(interval);
  }
  return intervals;
}

export default timbrePoly;
