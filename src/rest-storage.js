var restify = require('restify');
var storage = require('node-persist');

storage.initSync();

function toFileKey(owner, key) {
  return owner + '---' + key;
}

function rs_init(req, res, next) {
  // res.send('init: ' + req.params.owner);
  res.status(200).json({name: 'Irfan'});
  next();
}

function rs_get(req, res, next) {
  res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

  try {
    if(req.params.owner && req.params.owner.length != 0) {
      var owner = req.params.owner;
    } else {
      throw Error("Owner can't be empty");
    }

    if(req.params.key && req.params.key.length != 0) {
      var key = req.params.key;
    } else {
      throw Error("Key can't be empty");
    }

    // get action
    var data = storage.getItem(toFileKey(owner, key));

    // send response
    if(data) {
      var result = {
        status: 'success',
        owner: owner,
        key: key,
        value: data
      };
      res.end(JSON.stringify(result));
    } else {
      throw Error("Data doesn't exist");
    }

  } catch(err) {
    var result = {
      status: 'error',
      message: err.message
    };

    res.end(JSON.stringify(result));
  }

  next();
}

function rs_store(req, res, next) {
  res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

  try {
    if(req.params.owner) {
      var owner = req.params.owner;
    } else {
      throw Error("Owner can't be empty");
    }

    if(req.params.key) {
      var key = req.params.key;
    } else {
      throw Error("Key can't be empty");
    }

    if(req.params.value) {
      var strValue = req.params.value;
      var value = JSON.parse(strValue);
    } else {
      throw Error("Value can't be empty");
    }

    // store action
    storage.setItem(toFileKey(owner, key), value);

    // send response
    var result = {
      status: 'success',
      owner: owner,
      key: key,
      value: value
    };

    res.end(JSON.stringify(result));

  } catch(err) {
    var result = {
      status: 'error',
      message: err.message
    };

    res.end(JSON.stringify(result));
  }


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

server.use(restify.bodyParser());

server.post('/init', rs_init);

server.get('/get/:owner/:key', rs_get);

server.post('/store', rs_store);

server.get('/remove/:owner', rs_remove);

server.get('/clear/:owner', rs_clear);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;