const synaptic = require('synaptic'),
      winston = require('winston'),
      processTrainingSet = require('../process-trainer'),
      getFq = require('../frequency-for-note'),
      getNote = require('../note-for-frequency'),
      Trainer = synaptic.Trainer,
      Architect = synaptic.Architect;

function Network () {
  // Build network
  let smusicNetwork = new Architect.Perceptron(2, 10, 8);
  this.network = smusicNetwork;
  // Train network with default training set
  this.train(require('./trainer')[process.env.TRAINING_SET || 't1']);
  return this;
}

Network.prototype.train = function (set) {
  const trainer = new Trainer(this.network),
        trainingSet = processTrainingSet(set);

  winston.debug('Processing training set:', trainingSet);
  trainer.train(trainingSet);
};

Network.prototype.activate = function (inputs) {
  console.log(inputs.map(getFq));
  let result = this.network.activate(inputs.map(getFq));
  console.log('got result', result);
  return { notes: result.map(o => {
    return {
      note: getNote(o),
      velocity: o * 1.2
    };
  }), raw: result };
};

module.exports = new Network();
