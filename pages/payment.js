import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Albums from "../components/home/Albums";
import db from "../utils/Db";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incCart, decCart, justUpdate } from "../utils/redux/actions/index";
import axios from "axios";
import Grid from "@mui/material/Grid";
import ProductsUI from "../components/cart/Products";
import ButtonUI from "../components/cart/Button";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";

import CheckoutUI from "../components/payment/Checkout";

export default function Payment() {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [amountUSD, setAmountUSD] = React.useState(0);
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

  // async function convertCurrency(sum) {
  //   await axios
  //     .post(
  //       `https://api.fastforex.io/convert?from=INR&to=USD&amount=${sum}&api_key=33a9513157-b1ce64609f-r58pfy`
  //     )
  //     .then((u) => {
  //       console.log(u["data"]["result"].USD);
  //       setAmountUSD(u["data"]["result"].USD);
  //       console.log("convertttt");
  //     })
  //     .catch((err) => {
  //       console.log(err.response.message);
  //     });
  //   //https://console.fastforex.io/
  // }

  async function getCart(redirectToHome) {
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

        if (sum == 0 && redirectToHome) router.push("/");

        setTotalAmount(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // async function myOrdersUpdate(details, data, userDetails) {
  //   console.log("here in myOrdersUpdate");
  //   console.log(details);
  //   console.log(data);
  //   console.log(userDetails);
  //   console.log(cart);
  //   // return;
  //   await axios
  //     .post("/api/orders/seed", {
  //       token: sessionStorage.getItem("collegeBay"),
  //       cart: cart,
  //       details: details,
  //       data: data,
  //       amount: totalAmount,
  //       userDetails: userDetails,
  //     })
  //     .then((u) => {
  //       console.log(u);
  //     })
  //     .catch((err) => {
  //       console.log(err.response.message);
  //     });
  // }

  async function razorPayPaymentSuccessful(invoice) {
    console.log("razorPayPaymentSuccessful");
    invoice = {
      ...invoice,
      cart: cart,
    };

    console.log(invoice);

    await axios
      .post("/api/orders/seed", {
        token: sessionStorage.getItem("collegeBay"),
        invoice: invoice,
      })
      .then(async (u) => {
        console.log(u);
        await deleteCartItem();
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  }

  async function deleteCartItem() {
    await axios
      .post("/api/cart/seed", {
        token: sessionStorage.getItem("collegeBay"),
        delete: true,
        deleteAtOnce: true,
      })
      .then((u) => {
        getCart(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  useEffect(() => {
    getTheData();
    getCart(true);
  }, []);

  return (
    <div>
      <CheckoutUI
        totalAmount={totalAmount}
        razorPayPaymentSuccessful={razorPayPaymentSuccessful}
      />
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
