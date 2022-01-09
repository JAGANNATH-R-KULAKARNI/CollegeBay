import nc from "next-connect";
import db from "../../../utils/Db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const payload = jwt.verify(req.body.token, process.env.JWT_KEY);
  let user = await User.find({ email: payload.email });

  let orders = user[0].orders;
  const invoice = req.body.invoice;

  orders.push(invoice);

  var user_id = payload.id;

  User.findByIdAndUpdate(user_id, { orders: orders }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated  Orders of User : ", docs);
    }
  });

  await db.disconnect();

  return res.send({ message: "Successful updated Orders page" });
});

export default handler;
