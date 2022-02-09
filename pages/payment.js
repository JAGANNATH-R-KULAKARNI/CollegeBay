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
  const [orderId, setOrderId] = React.useState(null);

  const cartLen = useSelector((state) => state.changeCartLen);

  const router = useRouter();

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

  async function getCart(redirectToHome) {
    try {
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
    } catch (err) {
      console.log(err.message);
    }
  }

  async function cashOnDelivery(details, amount) {
    const invoice = {
      ...details,
      address: details.address1,
      amountPaid: amount,
      cart: cart,
    };

    delete invoice.address1;
    console.log(invoice);

    try {
      await axios
        .post("/api/payment/getids", {
          token: sessionStorage.getItem("collegeBay"),
        })
        .then(async (u) => {
          const d = new Date();

          invoice = {
            ...invoice,
            orderId: u["data"].order,
            receipt: u["data"].receipt,
            paidOn: d.toString(),
            email: u["data"].email,
            paymentId: "dummy",
          };
          setOrderId(invoice.orderId);
          console.log("Invoice");
          console.log(invoice);

          try {
            await axios
              .post("/api/orders/seed", {
                token: sessionStorage.getItem("collegeBay"),
                invoice: invoice,
                status: 0,
              })
              .then(async (u) => {
                console.log(u);
                await deleteCartItem();
              })
              .catch((err) => {
                console.log(err.response.message);
              });
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch((err) => {
          console.log(err.response.message);
        });
    } catch (err) {
      console.log(err.message);
    }
  }
  async function razorPayPaymentSuccessful(invoice) {
    try {
      invoice = {
        ...invoice,
        cart: cart,
      };

      console.log(invoice);
      setOrderId(invoice.orderId);
      await axios
        .post("/api/orders/seed", {
          token: sessionStorage.getItem("collegeBay"),
          invoice: invoice,
          status: 1,
        })
        .then(async (u) => {
          console.log(u);
          await deleteCartItem();
        })
        .catch((err) => {
          console.log(err.response.message);
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deleteCartItem() {
    try {
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
    } catch (err) {
      console.log(err.message);
    }
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
        cashOnDelivery={cashOnDelivery}
        cart={cart}
        orderId={orderId}
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
