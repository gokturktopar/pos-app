const paymentService = require("./payment")
const errors = require("../utils/error");
const request = require("../utils/request");

/**
 * 
 * @param {Object} data 
 * @param  {int} data.totalReceiptAmount
 * @param  {string} data.customerId
 */
const getQrCode = async (data) => {
  try {
    data.totalReceiptAmount = parseInt(data.totalReceiptAmount);
    let {totalReceiptAmount} = data; 
    const result = await request.post(`/get_qr_sale`, {totalReceiptAmount})
    //create payment record to send user panel
    await paymentService.create({...data, qrCode:result.data.QRdata});
    const decodedQr = paymentService.parseQrCode(result.data.QRdata);
    return {...result.data, ...decodedQr};
  } catch (e) {
    throw errors.BackendError(e);
  }
};

module.exports = {
  getQrCode,
};
