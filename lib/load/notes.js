var notes = 'abcdefg'.split(''),
    options = [];

notes.forEach(n => {
  for (let i = 1; i < 6; i++) {
    options.push(n.toUpperCase() + i);
  }
});

module.exports = options;
