let expect = require("chai").expect;
let brewery = require("../lib/brewery");

describe("get module", () => {
 it("should return requested brewery", function() {
   let result = brewery.get("boscos");
   expect(result).to.deep.equal({name:"boscos", address: "Overton Square, 2120 Madison Ave", city: "Memphis", state: "TN", zip: "38104", founded:2008});
 });

 it("fails w/ invalid brewery", () => {
   let result = brewery.get("foo");
   expect(result).to.be.undefined;
 });
});
describe("add module", () => {
 it("add requested brewery and return total in Breweries", function() {
   let result = brewery.add({name:"new brewery", address: "598 Monroe Avenue", city: "Memphis", state: "TN", zip: "38103", founded:2014});
   expect(result.added).to.be.true;
   expect(result.total).to.equal(6);
  });
  it("add fails requested brewery already in array and return total in Breweries", () => {
    var result = brewery.add({name:"boscos", address: "Overton Square, 2120 Madison Ave", city: "Memphis", state: "TN", zip: "38104", founded:2008});
    expect(result.added).to.be.false;
    expect(result.total).to.equal(6);
  });
 });
 describe("delete module", () => {
  it("should delete requested brewery and return total in Breweries", function() {
    let result = brewery.delete("boscos");
    expect(result.deleted).to.be.true;
    expect(result.total).to.equal(5);
   });
   it("delete fails requested brewery already in array", () => {
     var result = brewery.delete("bob");
     expect(result.deleted).to.be.false;
     expect(result.total).to.equal(5);
   });
  });
