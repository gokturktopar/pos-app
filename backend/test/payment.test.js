const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const testConstants = require("./_test.constants");
let server = require("../app");
const testFunctions = require("./_test.functions");

chai.use(chaiHttp);

before( function(done) {
  setTimeout(()=>{done()},100)
});
describe("/api/payment", () => {

  it("should get customer all payments",async  () => {
    const newQrCode = testConstants.generateQrBody();
    await testFunctions.generateQrCode(newQrCode);
     const {body,statusCode} = await chai
      .request(server)
      .get(`/api/payments?customerId=${newQrCode.customerId}`)
      expect(statusCode).to.equal(200);
      expect(body.length).to.eq(1);
     const item = body[0];
      expect(item).to.have.property("currency");
      expect(item.amount).to.eq(newQrCode.totalReceiptAmount);
      expect(item).to.have.property("time");
      expect(item.status).to.eq(0);  
  });
  it("should not get empty result for not existing customer", (done) => {
    chai
      .request(server)
      .get(`/api/payments?customerId=invalidCustomerId`)
      .end((err, res) => {
        const { body, statusCode } = res;
        expect(statusCode).to.equal(200);
        expect(body.length).to.eq(0);
        done();
      });
  });
  it("should complete payment", async () => {
    const newQrCode = testConstants.generateQrBody();
    const qrCodeResult = await testFunctions.generateQrCode(newQrCode);
    const {body,statusCode} = await  chai
      .request(server)
      .post(`/api/payments/complete-payment`)
      .send({qrData: qrCodeResult.QRdata})
      expect(statusCode).to.equal(200);
      const item = body
      expect(item.returnCode).to.eq(1000);
      expect(item.returnDesc).to.eq('OK');
  });

  it("should complete payment with invalid qr code", (done) => {
    chai
      .request(server)
      .post(`/api/payments/complete-payment`)
      .send({qrData: 'invalidqr'})
      .end((err, res) => {
        const { body, statusCode } = res;
        expect(statusCode).to.equal(400);
        done()
      });
  });
});
