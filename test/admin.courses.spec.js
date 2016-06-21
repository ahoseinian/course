'use strict';
require('./_utils');
var server = require('supertest')(require('../app'));
var should = require('should');
var config = require('./config');

describe('Courses Page', function() {
  context('Valid Admin', function() {
    beforeEach(function(done) {
      config.saveUser(config.currectAdmin, done);
    });
    it('GET index page', function(done) {
      config.logIn(config.currectAdmin, function(err, res) {
        server
          .get('/admin/courses')
          .set('Cookie', config.getCookie(res))
          .expect(200, done);
      });
    });

    it('Post new courses', function(done) {
      config.logIn(config.currectAdmin, function(err, res) {
        server
          .post('/admin/courses')
          .set('Cookie', config.getCookie(res))
          .send({ name: 'test', description: 'test' })
          .end(function(err, res) {
            should(res.status).equal(302);
            should(err).be.empty();
            should(res.header.location).equal('/admin/courses');
            done();
          });
      });
    });
  });

  context('not admin', function() {

    it('dont GET index page', function(done) {
      server
        .get('/admin/courses')
        .expect('Location', '/')
        .expect(401, done);
    });
  });
});
