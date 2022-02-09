import React from "react";
import { useRouter } from "next/router";
import { withRouter } from "next/router";
import ProductUI from "../../components/products/Product";
import db from "../../utils/Db";
import Product from "../../models/Product";

function ProductUIC({ data }) {
  const router = useRouter();

  if (!data.name) {
    return (
      <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
        Product Not Found
      </div>
    );
  }

  return (
    <div>
      <ProductUI data={data} />
    </div>
  );
}

export default withRouter(ProductUIC);

export async function getServerSideProps(context) {
  const { params } = context;

  await db.connect();
  const product = await Product.findOne({ route: params.Product }).lean();

  //The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects (POJOs), not Mongoose documents.
  await db.disconnect();
  console.log("product");
  console.log(product);
  return {
    props: {
      data: db.convertDocToObj(product),
    },
  };
}
