import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

function SignUp() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [OTP, setOTP] = React.useState("");
  const [OTPc, setOTPc] = React.useState("");
  const [OTPstatus, setOTPstatus] = React.useState("");

  const router = useRouter();

  const generateUser = async () => {
    if (OTP != OTPc) {
      alert("OTP incorrect");
      return;
    }

    await axios
      .post("/api/auth/signup", {
        name: name,
        email: email,
        password: password,
      })
      .then((u) => {
        console.log(u["data"]);
        router.push("/auth/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitForm = async () => {
    if (!name.length || !email.length || !password.length) {
      alert("All the fields are required");
      return;
    }

    setOTPstatus(true);
    const refe = Math.floor(Math.random() * 10000 + 1);
    setOTP(refe);

    await axios
      .post("/api/sendgridmail", {
        name: name,
        otp: refe,
        email: email,
      })
      .then((u) => {
        alert("Email sent");
      })
      .catch((err) => {
        alert("Email Not sent");
      });
  };
  return (
    <div>
      <div style={{ marginTop: "100px", paddingLeft: "15%" }}>
        <label>Name : </label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Email : </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password : </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {OTPstatus ? (
          <div>
            <label>OTP : </label>
            <input
              type="number"
              value={OTPc}
              onChange={(e) => setOTPc(e.target.value)}
            />
            <br />
          </div>
        ) : null}
        <button onClick={OTPstatus ? generateUser : onSubmitForm}>
          {OTPstatus ? "Verify" : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default SignUp;
