const Razorpay = require("razorpay");
const crypto = require("crypto");
import nc from "next-connect";

const handler = nc();

handler.post(async (req, res) => {
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    uid,
    email,
    amt,
  } = req.body;

  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
  const digest = shasum.digest("hex");

  if (digest !== razorpaySignature) {
    return res.send({ message: "Transaction is not authentic", status: 0 });
  }

  return res.send({
    message: "Transaction is Safe",
    status: 1,
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
  });
});

export default handler;
