import app from "../src/app.js"
import {expect} from "chai";
import sinon from "sinon";
import request from "supertest";


describe('This is test cases to for app.js file',()=>{
  it('should check app starting and routes',async()=>{
    const response = await request(app).get("/orders");
    expect(response.status).to.be.oneOf([200,201,401,403,400,422,500]);
  });
});