const teoria = require('teoria');

module.exports = fq => {
  return teoria.note.fromFrequency(fq * (process.env.NEURAL_SCALE || 1000)).note.scientific();
};
