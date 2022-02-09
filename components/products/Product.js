import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import * as c from "../../utils/Colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ButtonUI from "./Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incCart, decCart, justUpdate } from "../../utils/redux/actions";
import { useRouter } from "next/router";
import axios from "axios";

function Product(props) {
  const matches = useMediaQuery("(min-width:1000px)");
  const router = useRouter();
  const myState = useSelector((state) => state.changeCartLen);
  const dispatch = useDispatch();
  const [present, setPresent] = React.useState(false);

  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

  async function getCart() {
    try {
      await axios
        .post("/api/cart", {
          token: sessionStorage.getItem("collegeBay"),
        })
        .then((u) => {
          u["data"].cart &&
            u["data"].cart.map((item) => {
              if (item.route == props.data.route) {
                setPresent(true);
              }
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  React.useEffect(() => {
    getCart();
  }, []);

  const addToCartHandler = async (route, email) => {
    try {
      await axios
        .post("/api/cart/seed", {
          route: route,
          email: email,
          token: sessionStorage.getItem("collegeBay"),
          delete: false,
        })
        .then((u) => {
          dispatch(justUpdate(u["data"].len));
          console.log("its cart");
          console.log(u);
          setPresent(true);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const addToCartHandler2 = async (route, email) => {
    try {
      await axios
        .post("/api/cart/seed", {
          route: route,
          email: email,
          token: sessionStorage.getItem("collegeBay"),
          delete: false,
        })
        .then((u) => {
          dispatch(justUpdate(u["data"].len));
          router.push("/cart");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const DESKTOP = (
    <Grid container spacing={1} style={{ minHeight: "800px" }}>
      <Grid item xs={6}>
        <CardMedia
          component="img"
          style={{
            paddingLeft: "10%",
            paddingTop: "10%",
            paddingBottom: "10%",
            paddingRight: "10%",
            overflowY: "hidden",
          }}
          height="100%"
          width="100%"
          image={props.data.image}
          alt="Paella dish"
        />
      </Grid>
      <Grid item xs={6}>
        <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
          <h1
            style={{
              color: c.c1,
              fontSize: "60px",
              textDecoration: "underline",
            }}
          >
            {props.data ? props.data.name : null}
          </h1>
        </div>
        <br />
        <div
          style={{
            paddingLeft: "13%",
            paddingRight: "10%",
            marginTop: "-100px",
          }}
        >
          <h1 style={{ color: "black", fontSize: "60px" }}>
            ₹ {props.data ? props.data.price : null}
          </h1>
        </div>
        <div
          style={{
            paddingLeft: "13%",
            paddingRight: "10%",
            marginTop: "-50px",
          }}
        >
          <h1 style={{ color: "black", fontSize: "40px" }}>
            "{props.data ? props.data.brand : null}"
          </h1>
        </div>
        <div
          style={{
            paddingLeft: "13%",
            paddingRight: "10%",
            marginTop: "-20px",
          }}
        >
          <h1 style={{ color: "black", fontSize: "40px" }}>
            "{props.data ? props.data.category : null}"
          </h1>
        </div>
        <div
          style={{
            paddingLeft: "13%",
            paddingRight: "10%",
          }}
        >
          <h1
            style={{
              color: "black",
              fontSize: "20px",
              fontWeight: "500",
              fontFamily: "italic",
            }}
          >
            <FormatQuoteIcon /> {props.data ? props.data.description : null}
            <FormatQuoteIcon />
          </h1>
        </div>
        <br />
        <br />
        <div
          onClick={
            !present
              ? () => addToCartHandler(props.data.route, props.data.email)
              : null
          }
        >
          <ButtonUI
            text={present ? "Added to Cart" : "Add To Cart"}
            size="30px"
            mindis="420px"
            present={present}
          />
        </div>
        <br />
        <div
          onClick={() => addToCartHandler2(props.data.route, props.data.email)}
        >
          <ButtonUI text="Buy Now" size="30px" mindis="420px" />
        </div>
      </Grid>
    </Grid>
  );

  const MOBILE = (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <CardMedia
          component="img"
          style={{
            paddingLeft: "10%",
            paddingTop: "10%",
            paddingBottom: "10%",
            paddingRight: "10%",
            overflowY: "hidden",
          }}
          height="100%"
          width="100%"
          image={props.data.image}
          alt="Paella dish"
        />
      </Grid>
      <Grid item xs={12} style={{ minHeight: "600px" }}>
        <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
          <h1
            style={{
              color: c.c1,
              fontSize: "30px",
              textDecoration: "underline",
            }}
          >
            {props.data ? props.data.name : null}
          </h1>
        </div>
        <br />
        <div
          style={{
            paddingLeft: "13%",
            paddingRight: "10%",
            marginTop: "-60px",
          }}
        >
          <h1 style={{ color: "black", fontSize: "30px" }}>
            ₹ {props.data ? props.data.price : null}
          </h1>
        </div>
        <div
          style={{
            paddingLeft: "13%",
            paddingRight: "10%",
            marginTop: "-10px",
          }}
        >
          <h1 style={{ color: "black", fontSize: "20px" }}>
            "{props.data ? props.data.brand : null}"
          </h1>
        </div>
        <div
          style={{
            paddingLeft: "13%",
            paddingRight: "10%",
            marginTop: "-20px",
          }}
        >
          <h1 style={{ color: "black", fontSize: "20px" }}>
            "{props.data ? props.data.category : null}"
          </h1>
        </div>
        <div
          style={{
            paddingLeft: "13%",
            paddingRight: "10%",
          }}
        >
          <h1
            style={{
              color: "black",
              fontSize: "12px",
              fontWeight: "500",
              fontFamily: "italic",
            }}
          >
            <FormatQuoteIcon /> {props.data ? props.data.description : null}
            <FormatQuoteIcon />
          </h1>
        </div>
        <br />

        <div
          onClick={
            !present
              ? () => addToCartHandler(props.data.route, props.data.email)
              : null
          }
        >
          <ButtonUI
            text={present ? "Added to Cart" : "Add To Cart"}
            size="10px"
            mindis="90%"
            present={present}
          />
        </div>
        <br />
        <div
          onClick={() => addToCartHandler2(props.data.route, props.data.email)}
        >
          <ButtonUI text="Buy Now" size="10px" mindis="90%" />
        </div>
      </Grid>
    </Grid>
  );
  return (
    <div
      style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "30px" }}
    >
      <Paper style={{ width: "100%", minHeight: "600px" }} elevation={4}>
        {matches ? DESKTOP : MOBILE}
      </Paper>
      <br />
    </div>
  );
}

export default Product;
