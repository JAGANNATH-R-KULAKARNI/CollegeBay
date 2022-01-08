import nc from "next-connect";
import db from "../../../utils/Db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const payload = jwt.verify(req.body.token, process.env.JWT_KEY);
  let user = await User.find({ email: payload.email });
  const orders = user[0].orders;

  await db.disconnect();

  return res.send({
    message: "Successful got the orders ordered by the user",
    orders: orders,
  });
});

export default handler;
