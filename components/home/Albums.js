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

const theme = createTheme();

export default function Album(props) {
  const router = useRouter();
  const myState = useSelector((state) => state.changeCartLen);
  const dispatch = useDispatch();

  const addToCartHandler = async (route) => {
    await axios
      .post("/api/cart/seed", {
        route: route,
      })
      .then((u) => {
        console.log(u["data"].len);
        dispatch(justUpdate(u["data"].len));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    console.log("mysatetttttttttt");
    console.log(myState);
  };

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
            {props.products.map((card) => (
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
                        width: "20%",
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
                      style={{ backgroundColor: Colors.Purple, color: "white" }}
                      onClick={() => router.push(`/product/${card.route}`)}
                    >
                      View Product
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      style={{ backgroundColor: Colors.Yellow, color: "white" }}
                      onClick={() => addToCartHandler(card.route)}
                    >
                      Add To Cart
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
