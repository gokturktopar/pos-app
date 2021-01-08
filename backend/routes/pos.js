const express = require("express");
const router = express.Router();
const posService = require("../services/pos");

router.post("/generate-qr-code", async (req, res, next) => {
  try {
    const result = await posService.getQrCode(req.body)
    res.json(result);
  } catch (e) {
    res.status(400).json(e);

  }
});

module.exports = router;
