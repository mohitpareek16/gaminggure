const PaymentModel = require("./payment.model");
require('dotenv').config();
const nodemailer = require('nodemailer');

// const createPayment = async (req, res) => {
//   const paymentDataGet = req.body;
//   try {
//     const paymentData = new PaymentModel(paymentDataGet);
//     const savedPayment = await paymentData.save();
//     res.status(201).json({
//       message: "Payment created successfully",
//       data: savedPayment,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const createPayment = async (req, res) => {
  const paymentDataGet = req.body;
  const userEmail = req.body.email;
  console.log(paymentDataGet);
  try {
    const paymentData = new PaymentModel(paymentDataGet);
    const savedPayment = await paymentData.save();

    // Create a transporter to send the email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., Gmail, Outlook, etc.
      auth: {
        user: process.env.PUBLIC_SMTP_MAIL_TO,
        pass: process.env.PUBLIC_SMTP_PASS,
      },
    });

    // Create the email content
    const mailOptions = {
      from: process.env.PUBLIC_SMTP_MAIL_TO,
      to: userEmail,
      subject: 'Invoice for your payment',
      html: `
        <h1>Invoice</h1>
        <p>Thank you for your payment!</p>
        <p>Bill ID: ${Math.floor(Math.random() * Date.now()).toString(36)}</p>
        <p>Amount: ₹${paymentDataGet?.amount}</p>
        <p>Card Number: ${paymentDataGet?.card_number}</p>
        <p>Card Holder: ${paymentDataGet?.card_holder}</p>
        <p>Phone Number: ${paymentDataGet?.phone_number}</p>
        <p>Expires: ${paymentDataGet?.expires}</p>
        
      `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({
      message: 'Payment created successfully',
      data: savedPayment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await PaymentModel.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const paymentController = {
  createPayment,
  getPayments,
};

module.exports = paymentController;
