import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import SignInUI from "../../components/auth/signin/SignIn";

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

  async function completeReset() {
    try {
      await axios
        .post("/api/reset", {
          token: sessionStorage.getItem("collegeBay"),
        })
        .then((u) => {
          console.log("Complete Reset Is Successful");
          alert("Complete Reset Is Successful");
        })
        .catch((err) => {
          console.log("its an error");
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      {/* <div style={{ marginTop: "100px", paddingLeft: "15%" }}>
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
            <button onClick={completeReset}>Complete Reset</button>
          </p>
        </form>
      </div> */}
      <SignInUI />
    </div>
  );
}

export default SignIn;
