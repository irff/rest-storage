var supertest = require('supertest');
var should = require('should');

var restStorage = require('./../src/rest-storage.js');

var server = supertest.agent('http://localhost:8080');

function statusIsSuccess(res) {
  if('status' in res.body) {
    if(res.body.status != "success") return Error('status is not success');
  } else {
    return Error('status not found');
  }
}

function statusIsError(res) {
  if('status' in res.body) {
    if(res.body.status != "error") return Error('status is not error');
  } else {
    return Error('status not found');
  }
}

var testOwner = 'scele',
    testOwner2 = 'siak',
    testKey = 'student-irfan',
    testKey2 = 'student-tri',
    testKey3 = 'student-ahmad',
    testNonExistentKey = 'course-database',
    testValue = {
      name: 'Tri Ahmad Irfan',
      npm: '1306398983'
    };

describe('GET object', function() {
  it('should return the right JSON object when accessing existing data', function(done) {
    server
      .post('/store')
      .send({
        owner: testOwner,
        key: testKey,
        value: JSON.stringify(testValue)
      })
      .end(function(err, res) {
      });

    server
      .get('/get/' + testOwner + '/' + testKey)
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsSuccess)
      .expect({
        status: 'success',
        owner: testOwner,
        key: testKey,
        value: testValue
      })
      .end(function(err, res) {
        if(err) return done(err);
        done();        
      });

  });

  it('should return error when accessing nonexistent data', function(done) {
    server
      .get('/get/' + testOwner + '/' + testNonExistentKey)
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError)
      .end(function(err, res) {
        if(err) return done(err);
        done();        
      });
  });

  it('should return error when owner is not present in the request', function(done) {
    server
      .get('/get//x')
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError)
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });

  it('should return error when key is not present in the request', function(done) {
    server
      .get('/get/x/')
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError)
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });
});

describe('STORE object', function() {
  it('should store a valid JSON object', function(done) {
    server
      .post('/store')
      .send({
        owner: testOwner,
        key: testKey,
        value: JSON.stringify(testValue)
      })
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsSuccess)
      .expect({
        status: 'success',
        owner: testOwner,
        key: testKey,
        value: testValue
      })
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });

  it('should return error when owner is not present', function(done) {
    server
      .post('/store')
      .send({
        key: testKey,
        value: JSON.stringify(testValue)
      })
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError).
      end(function(err, res) {
        if(err) return done(err);
        done();        
      });
  })

  it('should return error when key is not present in the request', function(done) {
    server
      .post('/store')
      .send({
        owner: testOwner,
        value: JSON.stringify(testValue)
      })
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError).
      end(function(err, res) {
        if(err) return done(err);
        done();        
      });
  });

  it('should return error when value is not present in the request', function(done) {
    server
      .post('/store')
      .send({
        owner: testOwner,
        key: testKey
      })
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError).
      end(function(err, res) {
        if(err) return done(err);
        done();        
      });
  });

  it('should not store an invalid JSON object', function(done) {
    server
      .post('/store')
      .send({
        owner: testOwner,
        key: testKey,
        value: "{ not a json object }"
      })
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError).
      end(function(err, res) {
        if(err) return done(err);
        done();        
      });
  });
});

describe('REMOVE object', function() {
  it('should remove existing object and return the removed object', function(done) {
    server
      .post('/store')
      .send({
        owner: testOwner,
        key: testKey,
        value: JSON.stringify(testValue)
      })
      .end(function(err, res) {
      });

    server
      .get('/remove/' + testOwner + '/' + testKey)
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsSuccess)
      .expect({
        status: 'success',
        owner: testOwner,
        key: testKey,
        value: testValue
      })
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });

  it('should return error when owner is not present in the request', function(done) {
    server
      .get('/remove//x')
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError)
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });

  it('should return error when key is not present in the request', function(done) {
    server
      .get('/remove/x/')
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError)
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });

  it('should return error when removing non-existing data', function(done) {
    server
      .get('/remove/' + testOwner + '/' + testNonExistentKey)
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError)
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });
});

describe('CLEAR storage', function() {
  it('should clear all data owned by a specific owner and return the deleted keys', function(done)  {
    // store item 1
    server
      .post('/store')
      .send({
        owner: testOwner,
        key: testKey,
        value: JSON.stringify(testValue)
      })
      .end(function(err, res) {
      });

    // store item 2
    server
      .post('/store')
      .send({
        owner: testOwner,
        key: testKey2,
        value: JSON.stringify(testValue)
      })
      .end(function(err, res) {
      });

    // store item 3
    server
      .post('/store')
      .send({
        owner: testOwner2,
        key: testKey3,
        value: JSON.stringify(testValue)
      })
      .end(function(err, res) {
      });

    // clear item 1 & 2
    server
      .get('/clear/' + testOwner)
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsSuccess)
      .expect({
        status: 'success',
        cleared_keys: [testKey, testKey2]
      })
      .end(function(err, res) {
        if(err) return done(err);
      });

    // get item 1
    server
      .get('/get/' + testOwner + '/' + testKey)
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError)
      .end(function(err, res) {
        if(err) return done(err);
      });

    // get item 2
    server
      .get('/get/' + testOwner + '/' + testKey2)
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError)
      .end(function(err, res) {
        if(err) return done(err);
        done();        
      });

  });

  it('should return error when owner is not present in the request', function(done) {
    server
      .get('/clear/')
      .expect(200)
      .expect('Content-type', /json/)
      .expect(statusIsError)
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  })
});