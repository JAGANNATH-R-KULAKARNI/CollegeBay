import React from "react";
import { useRouter } from "next/router";
import { withRouter } from "next/router";
import ProductUI from "../../components/products/Product";

function Product(props) {
  const router = useRouter();
  const data = props.router.query;

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

export default withRouter(Product);
