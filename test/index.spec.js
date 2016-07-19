var supertest = require('supertest');
var server = supertest(require('../app.js'));

describe('index page', function(){
  it('is working fine', function(done){
    server
      .get('/')
      .expect(200, done);
  });
});
