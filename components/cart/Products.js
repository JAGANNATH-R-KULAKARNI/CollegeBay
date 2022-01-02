import React, { useEffect } from "react";
import CardUI from "./Card";

function Product({ data, deleteCartItem }) {
  // useEffect(() => {
  //   console.log("datatat");
  //   console.log(props.data);
  // }, []);
  return (
    <div>
      <br />

      <div
        style={{
          width: "100%",
          height: "570px",
          // backgroundColor: "yellow",
          overflow: "auto",
          paddingLeft: "10%",
          justifyContent: "center",
        }}
      >
        {data && data.length == 0 ? (
          <h1>No Items In The Cart</h1>
        ) : (
          data &&
          data.map((item) => {
            if (item && item.route) {
              return (
                <div key={item.route}>
                  <CardUI data={item} deleteCartItem={deleteCartItem} />
                  <br />
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
}

export default Product;
