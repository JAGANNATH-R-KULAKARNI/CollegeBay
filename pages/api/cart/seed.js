import nc from "next-connect";
import Cart from "../../../models/Cart";
import db from "../../../utils/Db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();

  const cart = await Cart.find({});
  if (req.body.delete == true) {
    if (cart.find((item) => item.route == req.body.route)) {
      await Cart.deleteMany({ route: req.body.route });
      return res.send({ message: "Deleted the product", len: cart.length - 1 });
    }

    return res.send({
      message: "Product is not available to delete",
      len: cart.length,
    });
  }
  if (cart.find((item) => item.route == req.body.route)) {
    return res.send({ message: "Product already present", len: cart.length });
  }

  await Cart.insertMany({
    route: req.body.route,
  });

  await db.disconnect();
  return res.send({
    message: "Cart is Seeded Successfully",
    len: cart.length + 1,
  });
});

export default handler;
