const express = require("express");
const router = express.Router();
const paymentService = require("../services/payment");

router.get("/", async (req, res, next) => {
  try {
    const result = await paymentService.getAll(req.query.customerId);
    res.status(200).send(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/complete-payment", async (req, res, next) => {
  try {
    const result = await paymentService.completePayment(req.body.qrData);
    res.status(200).send(result);
  } catch (e) {
    res.status(400).json(e);
  }
});
module.exports = router;
