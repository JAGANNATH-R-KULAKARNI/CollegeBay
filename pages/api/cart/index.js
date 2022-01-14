import nc from "next-connect";
import db from "../../../utils/Db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
import Product from "../../../models/Product";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connect();
    const payload = jwt.verify(req.body.token, process.env.JWT_KEY);
    let user = await User.find({ email: payload.email });
    let products = await Product.find({});

    let cart = [];
    for (var i = 0; i < products.length; i++) {
      var route = user[0].cart.find((ig) => ig.route == products[i].route);
      var item = products[i];

      if (typeof route != "undefined")
        cart.push({
          name: item.name,
          route: item.route,
          category: item.category,
          image: item.image,
          price: item.price,
          brand: item.brand,
          rating: item.rating,
          numReviews: item.numReviews,
          countInStock: item.countInStock,
          email: item.email,
        });
    }

    await db.disconnect();
    return res.send({ message: "got the cart", cart: cart });
  } catch (err) {
    return res.send({ message: "Something went wrong", cart: null });
  }
});

export default handler;
