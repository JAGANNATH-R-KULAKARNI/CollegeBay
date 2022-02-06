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

    let orders = user[0].orders;
    const invoice = req.body.invoice;

    orders.push(invoice);

    invoice.cart.map(async (item) => {
      let seller = await User.find({ email: item.email });

      console.log(seller[0]._id.toString());
      console.log(seller);
      let soldItems = seller[0].soldItems;

      soldItems.push({
        ...invoice,
        amountPaid: item.price,
      });

      User.findByIdAndUpdate(
        seller[0]._id.toString(),
        { soldItems: soldItems },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated  Orders of User : ", docs);
          }
        }
      );
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
  } catch (err) {
    return res.send({ message: "Something went wrong" });
  }
});

export default handler;
