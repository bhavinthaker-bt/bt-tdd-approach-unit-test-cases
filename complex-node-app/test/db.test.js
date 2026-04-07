import orderDetails from "../src/db/db.js";
import { expect } from "chai";

describe('Database connectivity test',()=>{
  it('should return order details',async()=>{
    const userId =1;
    const response = await orderDetails.getOrders(userId);
    expect(response[0].id).to.be.equal(1);
    expect(response[0].item).to.be.equal("Book");
    expect(response[0].userId).to.be.equal(1);
    expect(response).to.deep.equal([{id: 1, item: "Book", userId:1}]);
  });
});