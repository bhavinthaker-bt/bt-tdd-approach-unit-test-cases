import { expect } from "chai";
import userService from "../userService.js";


describe('This test is to get user detail by ID',()=>{
  it('should return user details based on ID',async()=>{
    const userId = 1;
    const response = await userService.getUserById(userId);
    expect(response.id).to.be.equal(1);
    expect(response.name).to.be.equal("Alice");
    expect(response).to.deep.equal({
      id: 1,
      name: "Alice"
    })
  });
});