import { expect } from "chai";
import {authMiddleware} from "../src/authMiddleware/authMiddleware.js";
import sinon from "sinon";

describe('auth middleware test cases',()=>{
  let req, res, next;
  beforeEach(()=>{
    req = { headers:{}}
    res = { status: sinon.stub().returnsThis(), json: sinon.spy()};
    next = sinon.spy();
  });
  afterEach(()=>{
    sinon.restore();
  });
  it('should throw an error when token is not defined in header',async()=>{
    try{
      await authMiddleware(req,res,next);
    }catch(err){
      expect(err.message).to.be.equal("No token provided");
    }
  });
  it('should throw and error as it is not valid-token',async()=>{
    try{
      req = {headers:{authorization:"not-a-valid-token"}};
      await authMiddleware(req,res,next);
    }catch(err){
      expect(err.message).to.be.equal("Invalid token");
    }
  });
  it('should return user id after passing valid token',async()=>{
    req={headers:{authorization:'valid-token'}};
    await authMiddleware(req,res,next);
    expect(next.called).to.be.true;
    expect(req.user).to.deep.equal({id: 1});
  });
});
