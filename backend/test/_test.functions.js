let server = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const generateQrCode = async (data) => {
  const {body} = await chai
  .request(server)
  .post(`/api/pos/generate-qr-code`)
  .send(data)
  return body
};

module.exports = {
  generateQrCode,
};
