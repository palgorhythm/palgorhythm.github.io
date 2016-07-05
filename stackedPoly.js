timbre.bpm = 180;

var synth = T("OscGen", {wave:"tri", mul:0.2});

T("interval", {interval:"L4", timeout:"5sec"}, function() {
    synth.noteOn(69, 80);
}).on("ended", function() {
    this.stop();
}).set({buddies:synth}).start();