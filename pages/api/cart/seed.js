import nc from "next-connect";
import db from "../../../utils/Db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connect();
    const payload = jwt.verify(req.body.token, process.env.JWT_KEY);

    let user = await User.find({ email: payload.email });

    if (req.body.delete == true) {
      if (
        user[0].cart.find((item) => item.route == req.body.route) ||
        req.body.deleteAtOnce
      ) {
        var updatedCart = [];

        if (!req.body.deleteAtOnce) {
          for (var j = 0; j < user[0].cart.length; j++) {
            if (user[0].cart[j].route != req.body.route)
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

    if (user[0].cart.find((item) => item.route == req.body.route))
      return res.send({
        message: "Product already present",
        len: user[0].cart.length,
      });

    let cart = user[0].cart;

    cart.push({ route: req.body.route, email: req.body.email });

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
  } catch (err) {
    return res.send({ message: "Comething went wrong", len: 0, cart: null });
  }
});

export default handler;
