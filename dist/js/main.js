$(document).ready(function() {
  var dist = new Tone.Chebyshev(50),
      synth = new Tone.PolySynth(4, Tone.Synth).connect(dist).toMaster(),
      loop;

  function stop () {
    Tone.Transport.stop();
  }

  function start () {
    Tone.Transport.start();
  }

  $('form').submit(function(e) {
    e.preventDefault();

    stop();

    if ( loop ) {
      loop.stop();
      loop.cancel();
      loop.dispose();
    }

    $.getJSON('/api/notes', {
      inputNotes: [ $('#fq1').val(), $('#fq2').val() ]
    }).done(function(response) {
      console.log(response);
      let notes = response.notes.map(function(n) {
        return n.note;
      });

      let seq = new Tone.Sequence(function(time, pitch) {
        let velocity = response.notes[notes.indexOf(pitch)].velocity;
        synth.triggerAttackRelease(pitch, velocity > 0.5 ? '4n' : '2n', time, velocity);
      }, notes, '4n');

      seq.start(0);
      seq.loop = true;
      seq.humanize = true;
      loop = seq;

      Tone.Transport.bpm.value = response.tempo;
      start();
    });
  });

  $('#start').click(start);
  $('#stop').click(stop);
});
