import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import CardUI from "./subcomponents/Card2";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Review(props) {
  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

  return (
    <React.Fragment>
      <div style={{ minWidth: m1 ? "400px" : "300px" }}>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            width: "100%",
            paddingLeft: m1 ? "5%" : "1%",
          }}
        >
          <CardUI
            image={props.data.imageUrl}
            data={{
              image: props.data.imageUrl,
              name: props.data.nameOfProduct,
              price: props.data.price,
              brand: props.data.brand,
              category: props.data.category,
            }}
          />
        </div>
        <br />
        <br />
      </div>
    </React.Fragment>
  );
}
