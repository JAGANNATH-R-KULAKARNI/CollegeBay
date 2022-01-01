import nc from "next-connect";
import jwt from "jsonwebtoken";

const handler = nc();

handler.post(async (req, res) => {
  if (!req.body.token) {
    return res.send({
      message: "Not Authenticated",
      currentUser: null,
    });
  }
  try {
    const payload = jwt.verify(req.body.token, process.env.JWT_KEY);
    return res.send({
      message: payload ? "Authorized" : "Not Authorized",
      currentUser: payload,
    });
  } catch (err) {
    return res.send({
      message: "Not Authorized",
      currentUser: null,
    });
  }

  return res.send({ message: "dummy code" });
});

export default handler;
