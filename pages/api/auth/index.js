import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/Db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  const users = await User.find({});

  await db.disconnect();
  return res.send(users);
});

export default handler;
