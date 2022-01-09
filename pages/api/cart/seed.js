import nc from "next-connect";
import Cart from "../../../models/Cart";
import db from "../../../utils/Db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const payload = jwt.verify(req.body.token, process.env.JWT_KEY);

  let user = await User.find({ email: payload.email });

  if (req.body.delete == true) {
    if (
      user[0].cart.find((item) => item == req.body.route) ||
      req.body.deleteAtOnce
    ) {
      var updatedCart = [];

      if (!req.body.deleteAtOnce) {
        for (var j = 0; j < user[0].cart.length; j++) {
          if (user[0].cart[j] != req.body.route)
            updatedCart.push(user[0].cart[j]);
        }
      }

      var user_id = payload.id;

      User.findByIdAndUpdate(
        user_id,
        { cart: updatedCart },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated User : ", docs);
          }
        }
      );

      return res.send({
        message: "Ok will delete",
        len: user[0].cart.length,
      });
    }

    return res.send({
      message: "Product not present to delete",
      len: user[0].cart.length,
    });
  }

  if (user[0].cart.find((item) => item == req.body.route))
    return res.send({
      message: "Product already present",
      len: user[0].cart.length,
    });

  let cart = user[0].cart;

  cart.push(req.body.route);

  var user_id = payload.id;

  User.findByIdAndUpdate(user_id, { cart: cart }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated User : ", docs);
    }
  });

  await db.disconnect();

  return res.send({ message: "Successful", len: cart.length, cart: cart });
});

export default handler;
