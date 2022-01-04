import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Albums from "../../components/home/Albums";
import db from "../../utils/Db";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incCart, decCart, justUpdate } from "../../utils/redux/actions/index";
import axios from "axios";
import Grid from "@mui/material/Grid";
import ProductsUI from "../../components/cart/Products";
import ButtonUI from "../../components/cart/Button";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";

import CheckoutUI from "../../components/payment/Checkout";

export default function Payment() {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [cart, setCart] = React.useState(null);
  const cartLen = useSelector((state) => state.changeCartLen);
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
        console.log("result from cart api");
        console.log(u["data"]);
        dispatch(justUpdate(u["data"].cart.length));
        setCart(u["data"].cart);
        let sum = 0;
        u["data"].cart.map((item) => {
          sum = sum + item.price;
        });
        setTotalAmount(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteCartItem(route) {
    await axios
      .post("/api/cart/seed", {
        route: route,
        token: sessionStorage.getItem("collegeBay"),
        delete: true,
      })
      .then((u) => {
        getCart();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  useEffect(() => {
    getTheData();
    getCart();
  }, []);

  return (
    <div>
      <CheckoutUI />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      cart: [],
      cartLen: 0,
    },
  };
}
