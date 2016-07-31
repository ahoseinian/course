var utils = require('./_utils');
var server = require('supertest')(require('../app'));
var should = require('should');
var User = require('../lib/back/models/user');
var config = require('./config');

describe('Auth', function() {
  context('Sign Up', function() {

    it('should add currect users', function(done) {
      server
        .post('/auth/signup')
        .send(config.sampleUser)
        .expect(302, function(err) {
          should.not.exists(err);
          User.count(function(err, newCount) {
            newCount.should.be.equal(1);
            done();
          });
        });
    });

    it('should not add incorrect users', function(done) {

      User.count(function(err, count) {
        server
          .post('/auth/signup')
          .send(config.incorrectUser)
          .expect(302, function(err) {
            should.not.exists(err);
            User.count(function(err, newCount) {
              newCount.should.be.equal(count);
              done();
            });
          });
      });
    });

  });


  context('Log in', function() {

    describe('with correct credentials', function() {
      beforeEach(function(done) {
        config.saveUser(config.currectUser, done);
      });

      it('should redirect to /', function(done) {
        server
          .post('/auth/login')
          .send({ email: config.currectUser.email, password: config.currectUser.password })
          .expect(302)
          .expect('Location', '/')
          .end(done);
      });
    });

    describe('with incorrect credentials', function() {
      it('should redirect to /login?error', function(done) {
        server
          .post('/auth/login')
          .send({ email: 'incorrect', password: 'incorrect' })
          .expect(302)
          .expect('Location', '/auth/login?error')
          .end(done);
      });
    });

  });


  describe('Log out', function() {
    it('should redirect to /', function(done) {
      server
        .get('/auth/logout')
        .expect('Location', '/')
        .expect(302, done);
    });
  });


});
