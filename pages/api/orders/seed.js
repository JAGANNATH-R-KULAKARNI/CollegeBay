import nc from "next-connect";
import db from "../../../utils/Db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const handler = nc();

handler.post(async (req, res) => {
  console.log(
    "here in orders seed post handler--------------------------------------------------------"
  );
  await db.connect();
  const payload = jwt.verify(req.body.token, process.env.JWT_KEY);
  let user = await User.find({ email: payload.email });
  console.log(
    "here in orders seed post handler------------------------------------------"
  );
  console.log(user);
  console.log("orders---");
  console.log(user[0].orders);
  console.log("cart in user---");
  console.log(user[0].cart);
  let orders = user[0].orders;
  const cart = req.body.cart;
  const details = req.body.details;
  const data = req.body.data;
  const userDetails = req.body.userDetails;

  orders.push({
    orderId: details.id,
    cart: cart,
    amountPaid: req.body.amount,
    paidOn: details.update_time,
    name: userDetails.name,
    email: payload.email,
    phnum: userDetails.phnum,
  });
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
