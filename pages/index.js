import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Albums from "../components/home/Albums";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { justUpdate } from "../utils/redux/actions/index";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [products, setProducts] = React.useState(null);

  async function getTheData() {
    try {
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
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getTheProducts() {
    await axios
      .post("/api/products", {
        token: sessionStorage.getItem("collegeBay"),
      })
      .then((u) => {
        console.log("In products");
        console.log(u);
        setProducts(u["data"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getCart() {
    try {
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
    } catch (err) {
      console.log(err.message);
    }
  }

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

  const RESET = (
    <div>
      <div style={{ height: "200px" }}></div>
      <button onClick={completeReset}>Reset</button>
    </div>
  );

  useEffect(() => {
    getTheData();
    getCart();
    getTheProducts();
  }, []);

  return true ? (
    <div> {products ? <Albums products={products} /> : null}</div>
  ) : (
    <div>{RESET}</div>
  );
}
