import nc from "next-connect";
import Cart from "../../../models/Cart";
import db from "../../../utils/Db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();

  const cart = await Cart.find({});

  if (cart.find((item) => item.route == req.body.route)) {
    res.send({ message: "Product already present", len: cart.length });
  }

  // await Cart.deleteMany({});
  await Cart.insertMany({
    route: req.body.route,
  });

  await db.disconnect();
  res.send({ message: "Cart is Seeded Successfully", len: cart.length + 1 });
});

export default handler;
