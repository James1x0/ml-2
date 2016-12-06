const getFq = require('./frequency-for-note');

module.exports = function (set) {
  let mapOutput = note => getFq(note) / (process.env.NEURAL_SCALE || 1000);

  return set.map(ob => {
    return {
      input: ob.input.map(getFq),
      output: ob.output.map(getFq)
    };
  });
};
