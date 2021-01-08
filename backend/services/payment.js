const { PaymentModel } = require("../utils/database");
const errors = require("../utils/error");
const currencies = require("iso4217");
const request = require("../utils/request");
const getAll = async (customerId) => {
  try {
    const payments = await PaymentModel.findAll({ where: { customerId } });
    return payments.map(({ qrCode, customerId, status }) => ({
      ...parseQrCode(qrCode),
      customerId,
      status,
      qrCode,
    }));
  } catch (e) {
    throw errors.BackendError(e);
  }
};
const create = async (user) => {
  try {
    const newUser = await PaymentModel.create(user);
    return newUser;
  } catch (e) {
    throw errors.BackendError(e);
  }
};

const markAsCompleted = async (qrCode) => {
  try {
    let record = await PaymentModel.findOne({ where: { qrCode } });
    if (!record) {
      throw errors.BackendError({
        status: 400,
        message: "Record could not found",
      });
    }
    const result = await record.update({ status: 1 });
    return result;
  } catch (e) {
    throw errors.BackendError(e);
  }
};

const completePayment = async (qrCode) => {
  try {
    const decodedQr = parseQrCode(qrCode);
    const body = {
      returnCode: 1000,
      returnDesc: "success",
      paymentInfoList: [
        {
          paymentProcessorID: 67,
          paymentActionList: [
            {
              paymentType: 3,
              amount: decodedQr.amount,
              currencyID: decodedQr.currencyId,
              vatRate: decodedQr.vatRate,
            },
          ],
        },
      ],
      QRdata: qrCode,
    };
    const result = await request.post("/payment", body);
    await markAsCompleted(qrCode);
    return result.data;
  } catch (e) {
    throw errors.BackendError(e);
  }
};
const tags = [
  {
    label: "currency",
    value: "53",
  },
  {
    label: "time",
    value: "82",
  },
  {
    label: "amount",
    value: "54",
  },
  {
    label: "vatRate",
    value: "86",
  },
];
const parseQrCode = (qrCode) => {
  const result = {};
  let i = 0;
  while (i < qrCode.length) {
    const foundTag = tags.find((tag) => tag.value == qrCode.substr(i, 2));
    const length = parseInt(qrCode.substr(i + 2, 2));
    if (foundTag) {
      result[foundTag.label] = qrCode.substr(i + 4, length);
    }
    i += length + 4; // skip length,tag and value
  }
  result.vatRate = parseInt(result.vatRate.split("-")[0]);
  result.currencyId = parseInt(result.currency);
  result.amount = parseInt(result.amount);
  result.currency = currencies[result.currency].Code;
  result.time = new Date(result.time);
  return result;
};

module.exports = {
  create,
  getAll,
  parseQrCode,
  completePayment,
};
