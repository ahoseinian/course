var server = require('supertest')(require('../../app'));
var Category = require('../../lib/back/models/category');

describe('admin categories', function() {
  describe('GET /', function() {
    it('is working fine', function(done) {
      server
        .get('/admin/categories')
        .expect(200, done);
    });
  });
});
