import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import SignInUI from "../../components/auth/signin/SignIn";

function SignIn() {
  return (
    <div>
      <SignInUI />
    </div>
  );
}

export default SignIn;
