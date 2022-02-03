import React, { useEffect } from "react";
import CardUI from "./Card";
import useMediaQuery from "@mui/material/useMediaQuery";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardUI2 from "./Card2";
import * as c from "../../utils/Colors";
const theme = createTheme();
function Product({ data, deleteCartItem }) {
  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

  if (!m1)
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <br />
        <main>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "0px",
            }}
          >
            <Container sx={{ py: 0 }} maxWidth="md">
              <Grid container spacing={m1 ? 30 : 4}>
                {data &&
                  data.map((card) => {
                    if (card && card.route) {
                      return (
                        <Grid item key={card} xs={6} sm={6} md={0}>
                          <CardUI2
                            data={card}
                            deleteCartItem={deleteCartItem}
                          />
                        </Grid>
                      );
                    }
                  })}
              </Grid>
            </Container>
          </div>
          <br />
          <br />
        </main>
      </ThemeProvider>
    );

  return (
    <div>
      <br />

      <div
        style={{
          width: "100%",
          height: "570px",
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
