import {expect} from "chai";
import {fetchOrders} from "../src/controller/orderController.js";
import orderDetails from "../src/db/db.js";
import sinon from "sinon";
import { json } from "express";

describe('unit test cases for order controller',()=>{
  let req, res;
  beforeEach(()=>{
    req = {
      user:{
        id: 1
      }
    }
    res={
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    }
  });
  afterEach(()=>{sinon.restore();});
  it('should throw an error ',async()=>{
    sinon.stub(orderDetails,'getOrders').resolves(new Error("Server error"));
    try{
      await fetchOrders(req,res);
    }catch(err){
      expect(err.message).to.be.equal("Server error");
    }
  });
  it('should return order object ',async()=>{
    sinon.stub(orderDetails,'getOrders').resolves([{ id: 1, item: "Book", userId:1 }]);
    await fetchOrders(req,res);
    // const response =  res.json.firstCall.args[0];
    // console.log(`value of the res.status ${response}`);
    expect(res.status.calledWith(200)).to.be.true;
  });
});