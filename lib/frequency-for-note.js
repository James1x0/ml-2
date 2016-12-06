const teoria = require('teoria');

module.exports = note => teoria.note(note).fq() / (process.env.NEURAL_SCALE || 1000);
