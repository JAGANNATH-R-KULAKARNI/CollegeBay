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
import * as Colors from "../../utils/Colors";
import Chip from "@mui/material/Chip";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incCart, decCart, justUpdate } from "../../utils/redux/actions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

const theme = createTheme();

export default function Album(props) {
  const router = useRouter();
  const myState = useSelector((state) => state.changeCartLen);
  const [products, setProducts] = React.useState(null);
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:700px)");
  const addToCartHandler = async (route) => {
    await axios
      .post("/api/cart/seed", {
        route: route,
        token: sessionStorage.getItem("collegeBay"),
        delete: false,
      })
      .then((u) => {
        console.log(u["data"]);
        console.log(u["data"].len);
        dispatch(justUpdate(u["data"].len));
        sortItOut2(u["data"].cart);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  async function sortItOut2(cart) {
    if (!cart) return;

    const hash = {};

    cart.map((item) => {
      hash[item] = true;
    });

    const products = props.products.map((item) => {
      if (hash[item.route]) {
        return {
          ...item,
          presentInCart: true,
        };
      } else {
        return {
          ...item,
          presentInCart: false,
        };
      }
    });

    setProducts(products);
  }
  async function sortItOut(cart) {
    const hash = {};

    cart.map((item) => {
      hash[item.route] = true;
    });

    const products = props.products.map((item) => {
      if (hash[item.route]) {
        return {
          ...item,
          presentInCart: true,
        };
      } else {
        return {
          ...item,
          presentInCart: false,
        };
      }
    });

    setProducts(products);
  }

  async function getCart() {
    console.log(sessionStorage.getItem("collegeBay"));
    await axios
      .post("/api/cart", {
        token: sessionStorage.getItem("collegeBay"),
      })
      .then((u) => {
        console.log("result from cart api(album.js)");
        console.log(props.products);
        console.log(u["data"].cart);
        sortItOut(u["data"].cart);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCart();
  }, []);
  // const deleteCartHandler = async (route) => {
  //   await axios
  //     .delete("/api/cart/seed", {
  //       route: route,
  //     })
  //     .then((u) => {
  //       console.log(u["data"]);
  //       console.log(u["data"].len);
  //       dispatch(justUpdate(u["data"].len));
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Lets Shop
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Indian retail chain of hypermarket, discount department store, and
              grocery store
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                style={{ backgroundColor: Colors.Purple }}
              >
                Shop Now
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products &&
              products.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        // pt: "56.25%",
                        pt: "0%",
                        height: "70%",
                      }}
                      image={card.image}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        style={{ color: Colors.Red, height: "60px" }}
                      >
                        {card.name}
                      </Typography>
                      <Typography style={{ color: Colors.Purple }}>
                        Price : {card.price}
                      </Typography>
                      <Typography style={{ color: Colors.Purple }}>
                        Category : {card.category}
                      </Typography>
                      <div style={{ height: "10px" }}></div>
                      <Chip
                        label="In Stock"
                        style={{
                          width: matches ? "20%" : "25%",
                          height: "19px",
                          backgroundColor: Colors.Blue,
                          color: "white",
                          fontSize: "10px",
                        }}
                      />
                    </CardContent>

                    <CardActions>
                      <Button
                        size="small"
                        variant="outlined"
                        style={{
                          backgroundColor: Colors.Purple,
                          color: "white",
                        }}
                        onClick={() => router.push(`/product/${card.route}`)}
                      >
                        View Product
                      </Button>

                      <Button
                        size="small"
                        disabled={card.presentInCart}
                        endIcon={
                          card.presentInCart ? <DoneOutlineIcon /> : null
                        }
                        variant="outlined"
                        style={{
                          backgroundColor: card.presentInCart
                            ? Colors.Green
                            : Colors.Yellow,
                          color: "white",
                        }}
                        onClick={() => addToCartHandler(card.route)}
                      >
                        {card.presentInCart ? "Added To Cart" : "Add To Cart"}
                      </Button>
                    </CardActions>
                    <div style={{ height: "10px" }}></div>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
