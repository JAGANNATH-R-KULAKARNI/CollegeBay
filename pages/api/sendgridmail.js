import nc from "next-connect";
const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API);

const handler = nc();

handler.post(async (req, res) => {
  const data = req.body;

  const message = `
  Hello "${data.name}",\r\n\n
  Thank You For Choosing "CollegeBay"\r\n\n\n

  Your One-Time-Password is ${data.otp}\r\n\n\n

         HAVE FUN ! \r\n\r\n\r\n
       
        App Creater - Jagannath R Kulakarni\r\n
        Follow me on www.linkedin.com/in/jagannath-r-kulakarni-a465841a7 (LinkedIn)
  `;

  const info = {
    to: `${data.email}`,
    from: {
      email: "jagannathrkulakarni.171845@gmail.com",
    },
    subject: "CollegeBay OTP",
    text: message,
    html: message.replace(/\r\n/g, "<br />"),
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
});

export default handler;
