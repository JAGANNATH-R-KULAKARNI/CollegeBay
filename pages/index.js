import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Albums from "../components/home/Albums";
import db from "../utils/Db";
import Product from "../models/Product";
import Cart from "../models/Cart";
import NavBar from "../components/home/NavBar";
import React, { useEffect } from "react";

export default function Home({ products, cartLen }) {
  let text = "";

  for (let i = 0; i < 10000; i++) {
    text = text + " jagannath ";
  }
  return (
    <div>
      <NavBar />
      <br />
      <br />
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
