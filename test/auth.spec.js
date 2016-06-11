var utils = require('./utils');
var server = require('supertest')(require('../app'));
var should = require('should');

var config = {
  path: '/auth',
  currectUser: {
    name: 'test',
    username: 'tester',
    password: 'changeme',
    repeatPassword: 'changeme',
    email: 'test@test.com'
  }
};

describe('Auth', function() {
  describe('Sign Up', function() {

    it('should add currect users', function(done) {
      server
        .post(config.path + '/signup')
        .send(config.currectUser)
        .expect(302)
        .end(function(err, res) {
          should.not.exists(err);
          done();
        });
    });

  });
});
