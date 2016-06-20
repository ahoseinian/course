var utils = require('./_utils');
var server = require('supertest')(require('../app'));
var should = require('should');
var Category = require('../lib/back/models/category');
var User = require('../lib/back/models/user');

var config = require('./config');

describe('admin categories', function() {
  var base = '/admin/categories';



  describe('GET /', function() {

    it('is restircted', function(done) {
      server
        .get(base)
        .expect('Location', '/')
        .expect(401, done);
    });

    context('admin', function() {
      beforeEach(function(done) {
        config.saveUser(config.currectAdmin, done);
      });
      it('works for admins', function(done) {
        server
          .post('/auth/login')
          .send(config.currectAdmin)
          .expect('Location', '/')
          .expect(302, function(err, res) {
            if (err) return done(err);
            server
              .get(base)
              .set('Cookie', config.getCookie(res))
              .expect(function(res) {
                res.text.should.match(/Categories Admin Page/);
              })
              .expect(200, done);
          });
      });
    });

  });

  describe('POST /', function() {

    it('is restircted', function(done) {
      server
        .post(base)
        .send({ name: 'test' })
        .expect('Location', '/')
        .expect(401, done);
    });

    context('admins', function() {
      beforeEach(function(done) {
        config.saveUser(config.currectAdmin, done);
      });
      it('works for admins', function(done) {
        server
          .post('/auth/login')
          .send(config.currectAdmin)
          .expect('Location', '/')
          .expect(302, function(err, res) {
            server
              .post(base)
              .set('Cookie', config.getCookie(res))
              .send({ name: 'test' })
              .expect(302, function(err) {
                should.not.exists(err);
                Category.count(function(err, count) { //category model should be saved
                  if (err) throw err;
                  count.should.be.equal(1);
                  done();
                });
              });
          });
      });
    });

  });


  describe('GET /:id/delete', function() {

    context('for guests', function() {
      it('is restricted', function(done) {
        var cat = new Category({ name: 'test' });
        cat.save();
        server
          .get(base + '/' + cat._id + '/delete')
          .expect('Location', '/')
          .expect(401, function(err) {
            if (err) throw err;
            Category.count(function(err, count) {
              count.should.be.equal(1);
              done();
            });
          });
      });
    });

  });
});
