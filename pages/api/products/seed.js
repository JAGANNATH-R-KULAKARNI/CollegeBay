// import nc from "next-connect"; //The method routing and middleware layer for Next.js API Routes.
// import Product from "../../../models/Product";
// import db from "../../../utils/Db";
// import { products } from "../../../utils/Data";

// const handler = nc();

// handler.get(async (req, res) => {
//   await db.connect();
//   await Product.deleteMany();
//   await Product.insertMany(products);
//   await db.disconnect();
//   res.send({ message: "Data is Seeded Successfully" });
// });

// export default handler;

import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/Db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connect();
    const payload = jwt.verify(req.body.token, process.env.JWT_KEY);

    let user = await User.find({ email: payload.email });
    var fullProducts = await Product.find({});

    let products = user[0].products;

    products.push(req.body.product);
    var refe = req.body.product;

    var strs = "";

    for (var i = 0; i < refe.nameOfProduct.length; i++) {
      if (refe.nameOfProduct[i] == " ") continue;

      strs = strs + refe.nameOfProduct[i];
    }
    var data = {
      name: refe.nameOfProduct,
      route: strs,
      category: refe.category,
      image: refe.imageUrl,
      price: refe.price,
      brand: refe.brand,
      rating: 0,
      numReviews: 0,
      countInStock: 10,
      description: [refe.description],
      email: payload.email,
    };

    fullProducts.push(data);
    console.log("hey");
    console.log(products);
    console.log("data");
    console.log(fullProducts);

    var user_id = payload.id;

    await Product.deleteMany();
    await Product.insertMany(fullProducts);

    User.findByIdAndUpdate(
      user_id,
      {
        products: products,
        keyId: req.body.keyId,
        secretKey: req.body.secretKey,
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated User : ", docs);
        }
      }
    );

    await db.disconnect();

    return res.send({ message: "Successful", products: products });
  } catch (err) {
    return res.send({ message: "Something went wrong" });
  }
});

export default handler;
