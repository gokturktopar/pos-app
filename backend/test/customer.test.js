const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const testConstants = require("./_test.constants");
let server = require("../app");
const db = require('../utils/database');
const should = require("chai").should();
chai.use(chaiHttp);
chai.use(require("chai-sorted"));

before( function(done) {
  setTimeout(()=>{done()},100)
});
describe("/api/customer", () => {

  it("should generate new customer id", (done) => {
    chai
      .request(server)
      .get("/api/customers/generate-customer-id")
      .send(testConstants.generateQrBody())
      .end((err, res) => {
        const { body, statusCode } = res;
        expect(statusCode).to.equal(200);
        expect(body).to.have.property("id");
        done();
      });
  });
});
