import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "$6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "$14.11",
  },
  { name: "Shipping", desc: "", price: "Free" },
];

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

//  name: name,
//   category: category,
//   imageUrl: imageUrl,
//   price: price,
//   brand: brand,
//   description: description,
//   nameOfShop: nameOfShop,
//   address: address,
//   email: email,
//   phnum: phnum,
//   keyId: keyId,
//   secretKey: secretKey,
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
