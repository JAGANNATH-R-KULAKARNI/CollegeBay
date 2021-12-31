import nc from "next-connect";
import Cart from "../../../models/Cart";
import db from "../../../utils/Db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const cart = await Cart.find({});
  // console.log(cart);
  await db.disconnect();
  res.send(cart);
});

export default handler;
