import calculateTotal from "../src/orderService.js";
import { expect } from "chai";
import sinon from "sinon";


beforeEach(async()=>{
  sinon.restore();
});

describe('It should calculate order total',()=>{
  it('should throw an error when order is null',async()=>{
    try{
      // const discountService ={
      //   getDiscount:async()={}
      // }
      // sinon.stub(discountService,'getDiscount').resolves(10);
      await calculateTotal(null,{});
    }catch(err){
      expect(err.message).to.be.equal('Invalid order');
    }
  });
  it('should throw an error when order.item is null',async()=>{
    try{
      const order = {userId: 1}
      await calculateTotal(order,{});
    }catch(err){
      expect(err.message).to.be.equal('Invalid order');
    }
  });
  it('should calculate the subtotal for given inputs',async()=>{
    const order = {
      userId: 1,
      items: [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 1 }
      ]
    };
    const discountService = {
      getDiscount: async () => {}
    };
    const discountServiceStub = sinon.stub(discountService,'getDiscount').resolves(10);
    const response = await calculateTotal(order,discountService);
    expect(discountServiceStub.calledOnceWith(1)).to.be.true;
    expect(response).to.be.a("number");
    expect(response).to.be.equal(15);
  });
  it('should not give any discount to subtotal',async()=>{
    const order = {
      userId: 1,
      items: [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 1 }
      ]
    }
    const discountService = {
      getDiscount:async()=>{}
    }
    const discountServiceStub = sinon.stub(discountService,'getDiscount').resolves(0);
    const response = await calculateTotal(order,discountService);
    expect(discountServiceStub.calledOnceWith(1)).to.be.true;
    expect(response).to.be.a("number");
    expect(response).to.be.equal(25);
  });
});