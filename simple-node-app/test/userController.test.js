import { expect } from "chai";
import sinon from "sinon";
import {getUser} from "../userController.js";
import userService from "../userService.js";

describe('This is to test user controller to get user details based on ID',()=>{
  let req, res;
  beforeEach(async()=>{
    req={
      params:{
        id: 1
      }
    }
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
  });
  afterEach(async()=>{
    sinon.restore();
  });
  it('it should return an error ',async()=>{
    sinon.stub(userService,'getUserById').resolves(undefined);
    try{
      await getUser(req,res);
    }catch(err){
      expect(err.message).to.be.equal("User not found");
    }
  });
  it('should return user json object',async()=>{
    sinon.stub(userService,'getUserById').resolves({id: 1, name: "Alice"});
    await getUser(req,res);
    const response =  res.json.firstCall.args[0];
    expect(res.status.calledWith(200)).to.be.true;
    expect(response.id).to.be.equal(1);
    expect(response.name).to.be.equal("Alice");
  });
});
