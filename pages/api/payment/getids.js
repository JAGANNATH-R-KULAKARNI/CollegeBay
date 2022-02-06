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

async function generateOrder(key) {
  const salt = randomBytes(8).toString("hex");
  const buf = await scryptAsync(key + Date.now().toString(), salt, 8);
  return `order_${buf.toString("hex")}`;
}

handler.post(async (req, res) => {
  const payload = jwt.verify(req.body.token, process.env.JWT_KEY);

  const receipt = await generateReceipt(
    "" + payload.id + payload.email + payload.name
  );

  const order = await generateOrder(
    "" +
      payload.id +
      payload.email +
      payload.name +
      Date.now() +
      process.env.JWT_KEY
  );

  return res.send({
    order,
    receipt,
    email: payload.email,
  });
});

export default handler;
