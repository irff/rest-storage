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

describe('INIT storage', function() {

});

describe('GET object', function() {
  it('should return json object', function(done) {
    server
      .get('/get/irfan')
      .expect(200)
      .expect('Content-type', /json/)
      .expect({
        name: 'Irfan'
      })
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });

});

describe('STORE object', function() {
  var testOwner = 'scele',
      testKey = 'student-irfan',
      testValue = {
        name: 'Tri Ahmad Irfan',
        npm: '1306398983'
      };

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

  it('should return error when key is not present', function(done) {
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

  it('should return error when value is not present', function(done) {
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

});

describe('CLEAR storage', function() {

});