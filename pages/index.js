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

export default function Home({ products, cartLen }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(justUpdate(cartLen));
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
