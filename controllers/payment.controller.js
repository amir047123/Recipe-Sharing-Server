const Payment = require("../models/payment.model");

const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);

const {
  createPaymentService,
} = require("../services/Payment.service");

// Create Payment
exports.createPayment = async (req, res) => {
const data = req.body;
  try {
    const customer = await stripe.customers.create({
      email: data?.token.email,
      source: data?.token.id,
    });
    
    const payment = await stripe.charges.create(
      {
        amount: data?.price*100,
        currency: "USD",
        customer: customer.id,
        receipt_email: data?.token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newPricingPayment = {
       token:data?.token, 
        userName:data?.userName,  
        plan:data?.plan,  
        price:data?.price,
        shippingAddress: {
          street: data?.token.card.address_line1,
          city: data?.token.card.address_city,
          country: data?.token.card.address_country,
          pinCode: data?.token.card.address_zip,
        },
        transactionId: payment?.balance_transaction,
       
      };
      
      const d = await createPaymentService(newPricingPayment);
      res.status(200).json({
        status: "success",
        message: "payment successfully Done!",
        data: d,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "payment fail",
        error: err.message,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.stack,
    });
  }
};

// Get Payment
exports.getPayment = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    const payments = await Payment.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);

    const total = await Payment.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });

    res.status(200).json({
      status: "success",
      data: payments,
      total: total,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "Internal server error",
    });
  }
};

