const Payment = require("../models/payment.model");

exports.createPaymentService = async (data) => {
  const createdPayment = await Payment.create(data);
  return createdPayment;
};

