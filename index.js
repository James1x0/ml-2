const route = require('koa-route'),
      koa = require('koa'),
      hbs = require('koa-hbs'),
      path = require('path'),
      winston = require('./lib/load/winston')(),
      serve = require('koa-static'),
      templateDir = path.join(__dirname, 'templates'),
      neuralNetwork = require('./lib/load/neurons');

// var parse = require('co-body');
var app = module.exports = koa();

// middleware
app.use(require('koa-logger')());
app.use(require('koa-simple-qs')());
app.use(serve(path.join('dist/')));
app.use(hbs.middleware({
  viewPath: templateDir,
  partialsPath: path.join(templateDir, 'partials')
}));

// route middleware
app.use(route.get('/', function*() {
  yield this.render('index', { availableNotes: require('./lib/load/notes') });
}));

app.use(route.get('/api/notes', function*() {
  let result = neuralNetwork.activate(this.request.body.inputNotes);
  winston.debug(`For input set: ${this.request.body.inputNotes}\nGot:\n${result}`);

  this.body = {
    notes: result,
    tempo: 180
  };
}));

// listen
if ( !module.parent ) {
  let port = process.env.PORT || 4001;
  winston.debug(`SMUSIC ML-2 API listening on port ${port}`);
  app.listen(port);
}
