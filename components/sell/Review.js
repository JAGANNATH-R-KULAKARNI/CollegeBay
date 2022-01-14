import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

export default function Review(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ul>
          <li>NAME : {props.data.nameOfProduct}</li>
          <li>CATEGORY : {props.data.category}</li>
          <li>PRICE : {props.data.price}</li>
          <li>BRAND : {props.data.brand}</li>
          <li>DESCRIPTION : {props.data.description}</li>
          <li>NAME OF SHOP : {props.data.name}</li>
          <li>ADDRESS : {props.data.address}</li>
          <li>EMAIL : {props.data.email}</li>
          <li>PHNUM : {props.data.phnum}</li>
          {/* <li>KEY ID : {props.data.keyId}</li>
          <li>SECRET KEY : {props.data.secretKey}</li> */}
          <br />
          <img src={props.data.imageUrl} width="30%" height="auto" />
        </ul>
      </List>
    </React.Fragment>
  );
}
