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
import CardUI from "./Card";
import CardUI2 from "./Card2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination } from "swiper/core";
import { Autoplay } from "swiper";
import SCom from "./StartingComponent";

SwiperCore.use([Autoplay]);
const theme = createTheme();

export default function Album(props) {
  const router = useRouter();
  const myState = useSelector((state) => state.changeCartLen);
  const [products, setProducts] = React.useState(null);
  const dispatch = useDispatch();

  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

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
          sortItOut2(u["data"].cart);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  async function sortItOut2(cart) {
    if (!cart) return;
    console.log("here");
    const hash = {};

    cart &&
      cart.map((item) => {
        hash[item.route] = true;
      });

    const products =
      props.products &&
      props.products.map((item) => {
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
    if (!cart) return;
    const hash = {};

    cart &&
      cart.map((item) => {
        hash[item.route] = true;
      });

    const products =
      props.products &&
      props.products.map((item) => {
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
    try {
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
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <br />
      <div style={{ marginTop: m1 ? "0px" : "-50px" }}>
        <SCom />
      </div>
      <main>
        <div>
          <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: m1 ? "-15px" : "-70px",
              }}
            >
              <p style={{ fontSize: m1 ? "35px" : "20px", fontWeight: 500 }}>
                Books & Notes
              </p>
            </div>
            <Swiper
              direction={"horizontal"}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              breakpoints={{
                300: {
                  slidesPerView: 2,
                  spaceBetween: 1,
                },

                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1400: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              pagination={{ clickable: true }}
              style={{
                height: "300px",
              }}
            >
              {products &&
                products.map((card, index) => {
                  if (card.category == "Book")
                    return (
                      <SwiperSlide
                        key={index + card.category}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
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
                            }}
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
                            }}
                          />
                        )}
                      </SwiperSlide>
                    );
                })}
            </Swiper>
          </div>
        </div>
        <div style={{ marginTop: m1 ? "0px" : "-60px" }}>
          <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: m1 ? "-15px" : "-70px",
              }}
            >
              <p style={{ fontSize: m1 ? "35px" : "20px", fontWeight: 500 }}>
                Instruments
              </p>
            </div>
            <Swiper
              direction={"horizontal"}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                reverseDirection: false,
              }}
              breakpoints={{
                300: {
                  slidesPerView: 2,
                  spaceBetween: 1,
                },

                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1400: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              pagination={{ clickable: true }}
              style={{
                height: "300px",
              }}
            >
              {products &&
                products.map((card, index) => {
                  if (card.category == "Instrument")
                    return (
                      <SwiperSlide
                        key={index + card.category}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
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
                            }}
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
                            }}
                          />
                        )}
                      </SwiperSlide>
                    );
                })}
            </Swiper>
          </div>
        </div>
        <div style={{ marginTop: m1 ? "0px" : "-60px" }}>
          <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: m1 ? "-15px" : "-70px",
              }}
            >
              <p style={{ fontSize: m1 ? "35px" : "20px", fontWeight: 500 }}>
                Pdfs
              </p>
            </div>
            <Swiper
              direction={"horizontal"}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              breakpoints={{
                300: {
                  slidesPerView: 2,
                  spaceBetween: 1,
                },

                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1400: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              pagination={{ clickable: true }}
              style={{
                height: "300px",
              }}
            >
              {products &&
                products.map((card, index) => {
                  if (card.category == "Pdf")
                    return (
                      <SwiperSlide
                        key={index + card.category}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
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
                            }}
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
                            }}
                          />
                        )}
                      </SwiperSlide>
                    );
                })}
            </Swiper>
          </div>
        </div>
        <div style={{ marginTop: m1 ? "0px" : "-60px" }}>
          <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: m1 ? "-15px" : "-70px",
              }}
            >
              <p style={{ fontSize: m1 ? "35px" : "20px", fontWeight: 500 }}>
                Codes
              </p>
            </div>
            <Swiper
              direction={"horizontal"}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                reverseDirection: false,
              }}
              breakpoints={{
                300: {
                  slidesPerView: 2,
                  spaceBetween: 1,
                },

                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1400: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              pagination={{ clickable: true }}
              style={{
                height: "300px",
              }}
            >
              {products &&
                products.map((card, index) => {
                  if (card.category == "Code")
                    return (
                      <SwiperSlide
                        key={index + card.category}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
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
                            }}
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
                            }}
                          />
                        )}
                      </SwiperSlide>
                    );
                })}
            </Swiper>
          </div>
        </div>
      </main>
      {m1 ? (
        <div>
          <br />
          <br />
          <br />
          <br />
        </div>
      ) : null}
    </ThemeProvider>
  );
}
