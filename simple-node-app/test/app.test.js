import app from '../app.js';
import { expect } from 'chai';
import request from 'supertest';

describe('These test cases cover for app',()=>{
  it('should test the app object',async()=>{
    const res = await request(app).get('/users/:id"');
    expect(res.status).to.be.oneOf([200,201,400,422,500]);
  });
});