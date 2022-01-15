import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/Db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.send({
      message: "User Not Found",
      status: 0,
    });
  }

  const found = await bcrypt.compare(req.body.password, user.password);

  if (!found) {
    return res.send({
      message: "Password is Incorrect",
      status: 0,
    });
  }

  const userJwt = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: 31556926,
    }
  );

  await db.disconnect();
  return res.send({
    message: "Successfully signed In",
    token: userJwt,
    status: 1,
  });
});

export default handler;
