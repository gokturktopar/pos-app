const { v4: uuid_v4 } = require('uuid');

/**
 * 
 * @param {Object} data 
 * @param  {int} data.totalReceiptAmount
 * @param  {string} data.customerId
 */
const generateCustomerId = async () => {
  try {
   return {id: uuid_v4()}
  } catch (e) {
    throw errors.BackendError(e);
  }
};


module.exports = {
  generateCustomerId,
};
