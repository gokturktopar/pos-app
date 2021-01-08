const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const testConstants = require("./_test.constants");
let server = require("../app");
const db = require('../utils/database');
const should = require("chai").should();
chai.use(chaiHttp);

before( function(done) {
  setTimeout(()=>{done()},100)
});
describe("/api/pos", () => {

  it("should generate qr code", (done) => {
    chai
      .request(server)
      .post("/api/pos/generate-qr-code")
      .send(testConstants.generateQrBody())
      .end((err, res) => {
        const { body, statusCode } = res;
        expect(statusCode).to.equal(200);
        expect(body).to.have.property("returnCode");
        expect(body).to.have.property("returnDesc");
        expect(body).to.have.property("QRdata");
        expect(body).to.have.property("currency");
        expect(body).to.have.property("amount");
        expect(body).to.have.property("time");
        expect(body).to.have.property("vatRate");
        expect(body).to.have.property("currencyId");
        done();
      });
  });
  it("should not generate code with missing amount ", (done) => {
    const {customerId} = testConstants.generateQrBody();
    chai
      .request(server)
      .post("/api/pos/generate-qr-code")
      .send({customerId})
      .end((err, res) => {
        const { body, statusCode } = res;
        expect(statusCode).to.equal(400);
        done();
      });
  });

  it("should not generate code with missing customer id ", (done) => {
    const {totalReceiptAmount} = testConstants.generateQrBody();
    chai
      .request(server)
      .post("/api/pos/generate-qr-code")
      .send({totalReceiptAmount})
      .end((err, res) => {
        const { body, statusCode } = res;
        expect(statusCode).to.equal(400);
        done();
      });
  });
});
