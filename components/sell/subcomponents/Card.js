import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import * as c from "../../../utils/Colors";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function MediaControlCard(props) {
  const theme = useTheme();
  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");
  return (
    <Card
      sx={{
        display: "flex",
        backgroundColor: c.c1,
        color: c.c2,
        minWidth: m2 ? "350px" : "230px",
        maxWidth: m2 ? (m5 ? "500px" : "400px") : "230px",
        // maxHeight: "300px",
      }}
      elevation={15}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingRight: "13%",
          maxWidth: "50%",
          minWidth: "50%",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="div"
            variant="h5"
            style={{
              wordWrap: "break-word",
              textAlign: "center",
              fontSize: m1 ? "24px" : "13px",
            }}
          >
            {props.data.name}
          </Typography>

          <div style={{ height: m1 ? "7px" : "10px" }}></div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: c.c2,
                height: m1 ? "26px" : "19px",
                width: "50%",
                color: c.c1,
                fontWeight: "bolder",
                display: "flex",
                justifyContent: "center",
                borderRadius: "20px",
                fontSize: m1 ? "17px" : "12px",
              }}
            >
              {props.data.brand}
            </div>
            <div style={{ width: "10%" }}></div>
            <div
              style={{
                backgroundColor: c.c2,
                height: m1 ? "26px" : "19px",
                width: "50%",
                color: c.c1,
                fontWeight: "bolder",
                display: "flex",
                justifyContent: "center",
                borderRadius: "20px",
                fontSize: m1 ? "17px" : "12px",
              }}
            >
              {props.data.category}
            </div>
          </div>

          <div style={{ height: "10px" }}></div>
          <div style={{ fontSize: "30px", textAlign: "center" }}>
            ₹ {props.data.price}
          </div>
          <div style={{ height: m1 ? "10px" : "15px" }}></div>
          <div
            style={{
              backgroundColor: c.c2,
              height: m1 ? "40px" : "32px",
              width: m1 ? "120%" : "150%",
              color: c.c1,
              fontWeight: "bolder",
              display: "flex",
              justifyContent: "center",
              fontSize: m1 ? "25px" : "19px",
            }}
          >
            View
          </div>
          <div style={{ height: "10px" }}></div>
          <div
            style={{
              backgroundColor: c.c2,
              height: m1 ? "40px" : "28px",
              width: m1 ? "120%" : "150%",
              color: c.c1,
              fontWeight: "bolder",
              display: "flex",
              justifyContent: "center",
              fontSize: m1 ? "20px" : "17px",
            }}
          >
            Add To Cart
          </div>
        </CardContent>
      </Box>
      <img
        component="img"
        sx={{ width: "50%", paddingLeft: "100px" }}
        src={props.image}
        alt="Live from space album cover"
      />
    </Card>
  );
}
