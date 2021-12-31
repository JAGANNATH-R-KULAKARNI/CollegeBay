import nc from "next-connect";
import Product from "../../models/Product";
import db from "../../utils/Db";
import { products } from "../../utils/Data";
// import User from "../../models/User";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  //   await User.deleteMany();
  //   await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(products);
  await db.disconnect();
  res.send({ message: "Data is Seeded Successfully" });
});

export default handler;
