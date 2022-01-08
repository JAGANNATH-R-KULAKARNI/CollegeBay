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

export default function MyOrders() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [orders, setOrders] = React.useState(null);

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
        console.log("result from cart api(myorders.js)");
        console.log(u["data"]);
        console.log(typeof u["data"].cart);
        dispatch(justUpdate(u["data"].cart.length));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getOrders() {
    console.log(sessionStorage.getItem("collegeBay"));
    await axios
      .post("/api/orders", {
        token: sessionStorage.getItem("collegeBay"),
      })
      .then((u) => {
        console.log("result from orders api(myorders.js)");
        console.log(u["data"]);
        setOrders(u["data"].orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTheData();
    getCart();
    getOrders();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My Orders</h1>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          {orders &&
            orders.map((item, index) => {
              return (
                <div key={index}>
                  <div
                    style={{
                      width: "200px",
                      height: "100px",
                      border: "2px solid black",
                      paddingLeft: "5%",
                    }}
                  >
                    <h6>
                      <h5>OrderId : {item.orderId}</h5>
                      Amount Paid : {item.amountPaid}
                      <br />
                      Cart(length) : {item.cart.length}
                    </h6>
                  </div>
                  <br />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
