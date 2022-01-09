import nc from "next-connect"; //The method routing and middleware layer for Next.js API Routes.
import Product from "../../../models/Product";
import db from "../../../utils/Db";
import { products } from "../../../utils/Data";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(products);
  await db.disconnect();
  res.send({ message: "Data is Seeded Successfully" });
});

export default handler;
