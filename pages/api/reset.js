import nc from "next-connect";
import Product from "../../models/Product";
import User from "../../models/User";
import db from "../../utils/db";
const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connect();
    await User.deleteMany({});
    await Product.remove({});

    await db.disconnect();
  } catch (err) {
    console.log(err);
    return res.send({ message: "Reset incomplete" });
  }
  return res.send({ message: "Reset is complete" });
});

export default handler;
