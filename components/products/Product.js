import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import * as Colors from "../../utils/Colors";
import useMediaQuery from "@mui/material/useMediaQuery";

function Product(props) {
  const matches = useMediaQuery("(min-width:1000px)");

  const DESKTOP = (
    <Grid container spacing={1}>
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
          <h1 style={{ color: Colors.Red }}>
            {props.data ? props.data.name : null}
          </h1>
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
      <Grid item xs={12}>
        <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
          <h1 style={{ color: Colors.Red }}>
            {props.data ? props.data.name : null}
          </h1>
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
