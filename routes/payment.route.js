const express = require("express");
const {
  createPayment,
  getPayment,
} = require("../controllers/payment.controller");
const router = express.Router();

router.post("/addPayment", createPayment);
router.get("/getPayment", getPayment);


module.exports = router;
