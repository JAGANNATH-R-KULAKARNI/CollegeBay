import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

function SignUp() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!name.length || !email.length || !password.length)
      alert("All the fields are required");

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
  return (
    <div>
      <div style={{ marginTop: "100px", paddingLeft: "15%" }}>
        <form>
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
          <button onClick={onSubmitForm}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
