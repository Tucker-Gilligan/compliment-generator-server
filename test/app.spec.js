const supertest = require('supertest');
const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app).get('/').expect(200, 'Hello, world!');
  });
});

// describe('Get all compliments', () => {
//   it('GET /api/compliments responds with 200 containing a list of all compliments', () => {
//     return supertest(app)
//       .get('/api/compliments')
//       .expect(200, 'List of Compliments');
//   });
// });
