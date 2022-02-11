import nc from "next-connect";
import db from "../../../utils/Db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
import * as c from "../../../utils/Colors";

const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API);

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connect();
    const payload = jwt.verify(req.body.token, process.env.JWT_KEY);
    let user = await User.find({ email: payload.email });

    let orders = user[0].orders;
    const invoice = req.body.invoice;

    orders.push(invoice);
    console.log("here inside orders see vrp");
    invoice.cart.map(async (item) => {
      let seller = await User.find({ email: item.email });

      let soldItems = seller[0].soldItems;
      let prdcts = seller[0].products;

      soldItems.push({
        ...invoice,
        amountPaid: item.price,
        status: req.body.status,
      });

      User.findByIdAndUpdate(
        seller[0]._id.toString(),
        { soldItems: soldItems },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated  Orders of User : ", docs);
          }
        }
      );

      const message = `
  Hello "${seller[0].name}",\r\n\n
  ${payload.name} purchased "${item.name}" ${
        req.body.status
          ? ` for ₹ ${item.price}`
          : " but amount is not paid(Cash on MeetUp)"
      }\r\n\n\n
 ${
   !req.body.status
     ? `Remaining amount to be paid is ₹ ${item.price}\r\n\n\n`
     : ""
 }
 Person's Contact number is : "${invoice.phnum}"\r\n\n\n
 Person's Email is : "${invoice.email}"\r\n\n\n
 Person's Address is : "${invoice.address}"\r\n\n\n
         HAVE FUN ! \r\n\r\n\r\n
       
        -CollegeBay(upcoming trillion dollor company)\r\n 
        App Creater - Jagannath R Kulakarni\r\n
        Follow me on www.linkedin.com/in/jagannath-r-kulakarni-a465841a7 (LinkedIn)
  `;

      const message2 = `
      Hello "${payload.name}",\r\n\n
  You purchased "${item.name}" ${
        req.body.status
          ? ` for ₹ ${item.price}`
          : " but amount is not paid(Cash on MeetUp)"
      }\r\n\n\n
 ${
   !req.body.status
     ? `Remaining amount to be paid is ₹ ${item.price}\r\n\n\n`
     : ""
 }
 
 Seller's Email is :  "${item.email}"\r\n\n\n
 Seller's Phone Number is : "${prdcts[0].phnum}"\r\n\n\n
 Seller's Address is : "${prdcts[0].address}"\r\n\n\n

         HAVE FUN ! \r\n\r\n\r\n
       
        -CollegeBay(upcoming trillion dollor company)\r\n
        App Creater - Jagannath R Kulakarni\r\n
        Follow me on www.linkedin.com/in/jagannath-r-kulakarni-a465841a7 (LinkedIn)
  `;

      const info = {
        to: `${item.email}`,
        from: {
          email: "jagannathrkulakarni.171845@gmail.com",
        },
        subject: "Your Item Sold -CollegeBay ",
        text: message,
        html: message.replace(/\r\n/g, "<br />"),
      };
      const info2 = {
        to: `${payload.email}`,
        from: {
          email: "jagannathrkulakarni.171845@gmail.com",
        },
        subject: "Your Order Successful -CollegeBay ",
        text: message2,
        html: message2.replace(/\r\n/g, "<br />"),
      };

      mail
        .send(info)
        .then(() => {
          console.log("sent");
          return res.send({ message: "email sent" });
        })
        .catch((err) => {
          console.log("not sent");
          console.log(err);
          return res.send({ message: "email not sent" });
        });

      mail
        .send(info2)
        .then(() => {
          console.log("sent");
          return res.send({ message: "email sent" });
        })
        .catch((err) => {
          console.log("not sent");
          console.log(err);
          return res.send({ message: "email not sent" });
        });
    });
    var user_id = payload.id;

    User.findByIdAndUpdate(user_id, { orders: orders }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated  Orders of User : ", docs);
      }
    });

    await db.disconnect();

    return res.send({ message: "Successful updated Orders page" });
  } catch (err) {
    return res.send({ message: "Something went wrong" });
  }
});

export default handler;
