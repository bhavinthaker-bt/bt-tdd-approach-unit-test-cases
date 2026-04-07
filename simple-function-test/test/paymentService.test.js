import { expect } from "chai";
import sinon from "sinon";
import processPayment from "../src/paymentService.js";

describe('This would calculate payment and process it',()=>{
  it('should throw and error when amount is null ',async()=>{
    try{
      await processPayment({},null);
    }catch(err){
      expect(err.message).to.be.equal('Invalid amount');
    }
  });
  it('should throw and error when amount is <=0 ',async()=>{
    try{
      await processPayment(0,null);
    }catch(err){
      expect(err.message).to.be.equal('Invalid amount');
    }
  });
  it('should not call retry when api is successful in first attempt',async()=>{
    const amount = 100;
    const paymentApi = {
      pay: async()=>{}
    }
    const paymentApiStub = sinon.stub(paymentApi,'pay').resolves('success');
    const result = await processPayment(paymentApi, amount);

    expect(paymentApiStub.calledOnceWith(100)).to.be.true;
    expect(result).to.equal('success');
  });
  it('should call retry when api is not successful in first attempt',async()=>{
    const amount=100;
    const paymentApi={
      pay: async()=>{}
    }
    const paymentApiStub = sinon.stub(paymentApi,'pay');
    paymentApiStub.onFirstCall().rejects(new Error('Failed'));
    paymentApiStub.onSecondCall().resolves('success');
    const respose = await processPayment(paymentApi,amount);
    expect(paymentApiStub.calledTwice).to.be.true;
    expect(respose).to.be.equal('success');
  });
  it('should fail in both api calls and throw an error',async()=>{
    const amount=100;
    const paymentApi = {
      pay:async()=>{

      }
    }
    const paymentApiStub = sinon.stub(paymentApi,'pay');
    paymentApiStub.onFirstCall().rejects(new Error('failed'));
    paymentApiStub.onSecondCall().rejects(new Error('failed'));
    try{
      const response = await processPayment(paymentApi,amount);
    }catch(err){
      expect(paymentApiStub.calledTwice).to.be.true;
      expect(err.message).to.be.equal('Payment failed');
    }
  });
});