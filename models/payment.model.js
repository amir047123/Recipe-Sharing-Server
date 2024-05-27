const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({

  userName: {
    type: String,
  },
  token: {
    type: Object,
  },
  plan: {
    type: Object,
  },
  
  shippingAddress: {
    type: Object,
  },
  price: {
    type: Number,
  },
  
  transactionId: {
    type: String,
  },
  
},
{ timetamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
