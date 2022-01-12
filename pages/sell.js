import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Albums from "../components/home/Albums";
import db from "../utils/Db";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { justUpdate } from "../utils/redux/actions/index";
import axios from "axios";
import { useRouter } from "next/router";
import SellUI from "../components/sell/SellPage";
import { Sell } from "@mui/icons-material";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  async function getTheData() {
    console.log(sessionStorage.getItem("collegeBay"));
    await axios
      .post("/api/auth/verify", {
        token: sessionStorage.getItem("collegeBay"),
      })
      .then((u) => {
        console.log("result from verify");
        console.log(u);

        if (!u["data"].currentUser) router.push("/auth/signin");
      })
      .catch((err) => {
        console.log(err);
        router.push("/auth/signin");
      });
  }

  async function getCart() {
    console.log(sessionStorage.getItem("collegeBay"));
    await axios
      .post("/api/cart", {
        token: sessionStorage.getItem("collegeBay"),
      })
      .then((u) => {
        console.log("result from cart api(index.js)");
        console.log(u["data"]);
        console.log(typeof u["data"].cart);
        dispatch(justUpdate(u["data"].cart.length));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTheData();
    getCart();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <br />
        <br />
        <br />
        <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
          <SellUI />
        </div>
      </div>
    </div>
  );
}
