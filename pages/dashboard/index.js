import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incCart, decCart, justUpdate } from "../../utils/redux/actions/index";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChartUI from "../../components/dashboard/Piechart";
import Avatar from "@mui/material/Avatar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Button from "@mui/material/Button";
import * as c from "../../utils/Colors";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const action = (
  <Button color="secondary" size="small">
    lorem ipsum dolorem
  </Button>
);

export default function Cart() {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [cart, setCart] = React.useState(null);
  const cartLen = useSelector((state) => state.changeCartLen);
  const router = useRouter();
  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

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
      router.push("/auth/signin");
    }
  }

  async function getCart() {
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
          setTotalAmount(sum);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getTheData();
    getCart();
  }, []);

  if (m1)
    return (
      <div>
        <br />
        <br />
        <br />
        <br />

        <div
          style={{
            paddingLeft: "10%",
            paddingRight: "5%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Paper
            style={{
              width: "50%",
              height: "350px",
              display: "flex",
              justifyContent: "center",
              padding: "4%",
            }}
            elevation={2}
          >
            <div style={{ width: "50%" }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <div style={{ width: "50%", height: "200px" }}>
              <SnackbarContent
                message="Jagannath R K"
                action={
                  <Tooltip title="Edit Name">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                }
                style={{ backgroundColor: c.c1, color: c.c2 }}
              />
              <br />
              <SnackbarContent
                message="jagannathrkulakarni.171845@gmail.com"
                style={{ backgroundColor: c.c1, color: c.c2 }}
              />
              <br />
              <SnackbarContent
                message="# Its my bio"
                action={
                  <Tooltip title="Edit Bio">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                }
                style={{ backgroundColor: c.c1, color: c.c2 }}
              />
            </div>
          </Paper>
          <div style={{ width: "50%", paddingLeft: "10%" }}>
            <Paper
              style={{
                width: "80%",
                height: "350px",
                display: "flex",
                justifyContent: "center",
              }}
              elevation={2}
            >
              <ChartUI />
            </Paper>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );

  return (
    <div>
      <br />
      <br />
      Dashboard
    </div>
  );
}
