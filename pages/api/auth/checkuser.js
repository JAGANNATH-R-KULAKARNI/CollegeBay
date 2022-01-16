import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/Db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();

  const user = await User.find({ email: req.body.email });

  if (user.length == 1) {
    return res.send({
      message: "This Email is already taken",
      status: 0,
    });
  }
  await db.disconnect();
  return res.send({
    message: "New User",
    status: 1,
  });
});

export default handler;
