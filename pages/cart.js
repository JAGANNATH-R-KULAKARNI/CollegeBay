import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Albums from "../components/home/Albums";
import db from "../utils/Db";
import Product from "../models/Product";
import Cart from "../models/Cart";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incCart, decCart, justUpdate } from "../utils/redux/actions/index";
import axios from "axios";
import Grid from "@mui/material/Grid";
import ProductsUI from "../components/cart/Products";
import ButtonUI from "../components/cart/Button";
import Paper from "@mui/material/Paper";

export default function Home({ data, cartLen }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(justUpdate(cartLen));
  }, []);
  return (
    <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={8} style={{ maxHeight: "600px" }}>
          <ProductsUI />
        </Grid>
        <Grid item xs={4} style={{ paddingLeft: "5%" }}>
          <Paper
            style={{ width: "100%", height: "350px", marginTop: "100px" }}
            elevation={3}
          >
            <div style={{ padding: "5%", textAlign: "center" }}>
              <p style={{ fontSize: "20px" }}> Total Items </p>
              <p style={{ fontSize: "40px", marginTop: "-20px" }}>5 </p>
              <p style={{ fontSize: "20px", marginTop: "-20px" }}>
                {" "}
                Total Amount
              </p>
              <p style={{ fontSize: "40px", marginTop: "-20px" }}>₹ 1000 </p>
              <div style={{ marginTop: "-20px" }}>
                <ButtonUI text="Checkout" />
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  const cart = await Cart.find({}).lean();
  await db.disconnect();

  let data = [];
  cart.map((item) => {
    products.map((item2) => {
      if (item2.route == item.route) {
        let status = data.find((item3) => item3.route == item.route);

        if (!status) {
          data = [...data, item];
        }
      }
    });
  });

  return {
    props: {
      cart: data.map(db.convertDocToObj),
      cartLen: cart.length,
    },
  };
}
