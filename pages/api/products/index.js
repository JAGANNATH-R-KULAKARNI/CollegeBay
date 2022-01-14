import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/Db";
import jwt from "jsonwebtoken";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const payload = jwt.verify(req.body.token, process.env.JWT_KEY);
  if (!payload) return res.send({ message: "Somethin went wrong" });

  const products = await Product.find({}).lean();

  let finalProducts = [];

  products.map((item) => {
    if (item.email != payload.email)
      finalProducts.push({
        name: item.name,
        route: item.route,
        category: item.category,
        image: item.image,
        price: item.price,
        brand: item.brand,
        rating: item.rating,
        numReviews: item.numReviews,
        countInStock: item.countInStock,
        description: item.description,
        email: item.email,
      });
  });
  console.log(finalProducts);
  await db.disconnect();
  return res.send(finalProducts);
});

export default handler;
