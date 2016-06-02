var restify = require('restify');

function rs_init(req, res, next) {
  // res.send('init: ' + req.params.owner);
  res.status(200).json({name: 'Irfan'});
  next();
}

function rs_get(req, res, next) {
  var result = {name: 'Irfan'};
  res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
  res.end(JSON.stringify(result));
  // res.send('get: ' + req.params.owner);
  next();
}

function rs_set(req, res, next) {
  res.send('set: ' + req.params.owner);
  next();
}

function rs_remove(req, res, next) {
  res.send('remove: ' + req.params.owner);
  next();
}

function rs_clear(req, res, next) {
  res.send('clear: ' + req.params.owner);
  next();
}

var server = restify.createServer();

server.post('/init', rs_init);

server.get('/get/:owner', rs_get);

server.post('/set', rs_set);

server.get('/remove/:owner', rs_remove);

server.get('/clear/:owner', rs_clear);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;