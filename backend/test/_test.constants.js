const Chance = require('chance');
const chance = new Chance();
const { v4: uuid_v4 } = require('uuid');

module.exports = {
    generateQrBody : () => ({
        totalReceiptAmount: chance.integer({ min: 1, max: 20 }),
        customerId: uuid_v4()
    }),
}
