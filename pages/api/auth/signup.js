import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/Db";
import bcrypt from "bcrypt";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();

  const salt = await bcrypt.genSalt(10);
  const hashedPasswd = await bcrypt.hash(req.body.password, salt);

  const checkUser = await User.findOne({ email: req.body.email });

  if (checkUser) {
    return res.send({
      message: "User already present",
    });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPasswd,
  });

  await User.insertMany(user);

  await db.disconnect();
  return res.send({ message: "successfully signed Up " });
});

export default handler;
