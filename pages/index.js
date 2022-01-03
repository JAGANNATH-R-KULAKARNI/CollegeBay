import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Albums from "../components/home/Albums";
import db from "../utils/Db";
import Product from "../models/Product";
import Cart from "../models/Cart";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { justUpdate } from "../utils/redux/actions/index";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home({ products }) {
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
    <div>
      <Albums products={products} />
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const products = await Product.find({}).lean();
  const cart = await Cart.find({}).lean();

  //The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects (POJOs), not Mongoose documents.
  await db.disconnect();
  // console.log(products);
  return {
    props: {
      products: products.map(db.convertDocToObj),
      cartLen: cart.length,
    },
  };
}
