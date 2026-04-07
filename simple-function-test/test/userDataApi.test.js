import getUserProfile from '../src/userDataApi.js';
import sinon from 'sinon';
import { expect } from 'chai';

describe('It should test getUserProfile function',()=>{
  it('should throw an error when userID is not defined',async()=>{
    try{
      await getUserProfile(null,{});
    }catch(err){
      expect(err.message).to.equal('User ID is required');
    }
  });
  it('should return user object',async()=>{
    const userApi = {
      fetchUser: async () => {}
    };
    const userApiStub = sinon.stub(userApi,'fetchUser').resolves({
       id: "1",
       name: "John",
       isActive: true,
    });
    const response = await getUserProfile(1,userApi);
    expect(userApiStub.calledOnceWith(1)).to.be.true;
    expect(response).to.deep.equal({
      id: "1",
       name: "John",
       isActive: false,
    });
  });
  it('should return null object',async()=>{
    const userApi={
      fetchUser:async()=>{}
    }
    const userApiStub = sinon.stub(userApi,'fetchUser').resolves(null);
    const response = await getUserProfile(1,userApi);
    expect(response).to.be.null;
  });
});