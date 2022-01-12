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
import Cart from "../../../models/Cart";
import Product from "../../../models/Product";
import db from "../../../utils/Db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const payload = jwt.verify(req.body.token, process.env.JWT_KEY);

  let user = await User.find({ email: payload.email });
  var fullProducts = await Product.find({});
  // if (req.body.delete == true) {
  //   if (
  //     user[0].cart.find((item) => item == req.body.route) ||
  //     req.body.deleteAtOnce
  //   ) {
  //     var updatedCart = [];

  //     if (!req.body.deleteAtOnce) {
  //       for (var j = 0; j < user[0].cart.length; j++) {
  //         if (user[0].cart[j] != req.body.route)
  //           updatedCart.push(user[0].cart[j]);
  //       }
  //     }

  //     var user_id = payload.id;

  //     User.findByIdAndUpdate(
  //       user_id,
  //       { cart: updatedCart },
  //       function (err, docs) {
  //         if (err) {
  //           console.log(err);
  //         } else {
  //           console.log("Updated User : ", docs);
  //         }
  //       }
  //     );

  //     return res.send({
  //       message: "Ok will delete",
  //       len: user[0].cart.length,
  //     });
  //   }

  //   return res.send({
  //     message: "Product not present to delete",
  //     len: user[0].cart.length,
  //   });
  // }

  // if (user[0].cart.find((item) => item == req.body.route))
  //   return res.send({
  //     message: "Product already present",
  //     len: user[0].cart.length,
  //   });

  let products = user[0].products;
  // console.log(products);
  products.push(req.body.product);
  var refe = req.body.product;
  //   name: { type: String, required: true },
  // route: { type: String, required: true, unique: true },
  // category: { type: String, required: true },
  // image: { type: String, required: true },
  // price: { type: Number, required: true },
  // brand: { type: String, required: true },
  // rating: { type: Number, required: true, default: 0 },
  // numReviews: { type: Number, required: true, default: 0 },
  // countInStock: { type: Number, required: true, default: 0 },
  // description: { type: [String], required: true },
  // email: { type: String, required: true },

  // nameOfProduct: name,
  //   category: category,
  //   imageUrl: imageUrl,
  //   price: price,
  //   brand: brand,
  //   description: description,
  //   name: nameOfShop,
  //   address: address,
  //   email: email,
  //   phnum: phnum,
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
  // try {

  // } catch (err) {
  //   console.log("its error");
  //   console.log(err);
  // }

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
});

export default handler;
