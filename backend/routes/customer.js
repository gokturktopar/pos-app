const express = require("express");
const router = express.Router();
const customerService = require("../services/customer");

router.get("/generate-customer-id", async (req, res, next) => {
  try {
    const result = await customerService.generateCustomerId()
    res.json(result);
  } catch (e) {
    res.status(400).json(e);

  }
});

module.exports = router;
