import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardUI from "./Card";
import CardUI2 from "./Card2";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as c from "../../utils/Colors";
import { useSelector } from "react-redux";

const theme = createTheme();

export default function Results(props) {
  const text = useSelector((state) => state.SearchText);
  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <br />
      <main>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: m1 ? "-200px" : "0px",
          }}
        >
          <Container sx={{ py: 0 }} maxWidth="md">
            <Grid container spacing={m1 ? 30 : 4}>
              {props.products &&
                props.products.map((card) => (
                  <Grid item key={card} xs={m1 ? 12 : 6} sm={6} md={m1 ? 4 : 0}>
                    {m1 ? (
                      <CardUI
                        image={card.image}
                        data={{
                          image: card.image,
                          name: card.name,
                          price: card.price,
                          brand: card.brand,
                          category: card.category,
                          route: card.route,
                          email: card.email,
                          status: card.presentInCart,
                        }}
                        addToCartHandler={props.addToCartHandler}
                      />
                    ) : (
                      <CardUI2
                        image={card.image}
                        data={{
                          image: card.image,
                          name: card.name,
                          price: card.price,
                          brand: card.brand,
                          category: card.category,
                          route: card.route,
                          email: card.email,
                          status: card.presentInCart,
                        }}
                        addToCartHandler={props.addToCartHandler}
                      />
                    )}
                  </Grid>
                ))}
            </Grid>
          </Container>
        </div>
        {props.products && text.length > 0 && props.products.length == 0 ? (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={
                  false
                    ? "https://media.giphy.com/media/2tRBdHz4Wwhyw/giphy.gif"
                    : "https://media.giphy.com/media/OiC5BKaPVLl60/giphy.gif"
                }
                width={m1 ? "700px" : "300px"}
                height="auto"
              />
            </div>
          </div>
        ) : null}
        <br />
        <br />
        {m1 ? (
          <div>
            <br />
            <br />
          </div>
        ) : null}
      </main>
    </ThemeProvider>
  );
}
