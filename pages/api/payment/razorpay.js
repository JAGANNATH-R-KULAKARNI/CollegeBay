import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
const Razorpay = require("razorpay");
import nc from "next-connect";
import jwt from "jsonwebtoken";

const scryptAsync = promisify(scrypt);
const handler = nc();

async function generateReceipt(key) {
  const salt = randomBytes(8).toString("hex");
  const buf = await scryptAsync(key + Date.now().toString(), salt, 4);
  return `CollegeBay-${buf.toString("hex")}`;
}

const createOrder = async ({ amount, payload }) => {
  try {
    console.log("here in createOrder");
    if (process.env.RAZORPAY_KEY_ID) console.log("present");
    else console.log("not present");

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    console.log("nice");
    const receipt = await generateReceipt(
      "" + payload.id + payload.email + payload.name
    );

    const options = {
      amount: amount * 100, //Amount Rs to Paisa  currency subunits
      currency: "INR",
      receipt: receipt,
    };

    const order = await instance.orders.create(options);
    if (!order) {
      console.log("Order creation failed", res.body);
      return res.send({ message: "order creatation failed", status: 0 });
    }

    return {
      order: order,
      receipt: receipt,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error("There was an Error creating order", error.message);
  }
};

handler.post(async (req, res) => {
  if (!req.body) {
    return res.send({ message: "order creatation failed", status: 0 });
  }

  try {
    const payload = jwt.verify(req.body.token, process.env.JWT_KEY);

    const { amount } = req.body;

    const { order, receipt } = await createOrder({
      amount,
      payload,
    });

    return res.send({
      id: order.id,
      amt: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
      receipt: receipt,
      message: "order creatation Successful",
      status: 1,
      email: payload.email,
    });
  } catch (err) {
    console.log("hey its unsuccessful");
    return res.send({ message: "order creatation failed", status: 0 });
  }
});

export default handler;
