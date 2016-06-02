var supertest = require('supertest');
var should = require('should');

var rest = require('./../src/rest.js');

var server = supertest.agent('http://localhost:8080');

describe('GET something', function() {
  it('should return json object', function(done) {
    server
      .get('/get/irfan')
      .expect('Content-type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });
});