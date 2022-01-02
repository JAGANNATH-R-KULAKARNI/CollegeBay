import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!email.length || !password.length) alert("All the fields are required");

    await axios
      .post("/api/auth/signin", {
        email: email,
        password: password,
      })
      .then((u) => {
        console.log(u["data"]);
        sessionStorage.setItem("collegeBay", u["data"].token);
        router.push("/");
      })
      .catch((err) => {
        console.log("token not set");
        console.log(err);
      });
  };
  return (
    <div>
      <div style={{ marginTop: "100px", paddingLeft: "15%" }}>
        <form>
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
          <button onClick={onSubmitForm}>Submit</button>
          <br />
          <p>
            New User ? <Link href="/auth/signup">SignUp</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
