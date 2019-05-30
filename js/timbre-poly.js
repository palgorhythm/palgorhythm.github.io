import $ from "jquery";
import Interval from "./interval.js";

function timbrePoly(opts) {
  const ratio = [+opts.A, +opts.B];
  const levels = +opts.levels > 6 ? 6 : +opts.levels; // input: up to
  const BPM = +opts.bpm;
  let intervals = [];

  const baseInterval = ((60 / BPM) * 1000.0) / Math.pow(ratio[0], levels);
  const base = 200;
  const freqs = [1, 10 / 9, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 15 / 8].map(function(
    i
  ) {
    return i * base;
  });

  let Bpow = levels;
  let Apow = 0;
  let currentRhythm;
  let interval;
  let numDotsForThisFreq;
  for (var i = 0; i <= levels; i += 1) {
    numDotsForThisFreq = opts.B ** Bpow * opts.A ** Apow;
    Bpow--;
    Apow++;
    currentRhythm = Math.pow(ratio[0], levels - i) * Math.pow(ratio[1], i);
    interval = new Interval({
      id: i,
      levels: levels,
      interval: baseInterval * currentRhythm,
      volume: 0.2,
      freq: freqs[i],
      numDotsForThisFreq: numDotsForThisFreq,
      maxNumDots: Math.max(opts.A, opts.B) ** levels
    });
    interval.start();
    intervals.push(interval);
  }
  return intervals;
}

export default timbrePoly;
