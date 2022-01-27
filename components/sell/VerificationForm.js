import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function PaymentForm(props) {
  return (
    <React.Fragment>
      <Typography
        variant="h5"
        gutterBottom
        style={{ fontWeight: "bolder", textAlign: "center" }}
      >
        Verification
      </Typography>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="shopName"
            label="Name Of Shop/Person"
            fullWidth
            value={props.nameOfShop}
            onChange={(e) => props.setNameOfShop(e.target.value)}
            type="name"
            autoComplete="name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="address"
            label="Address"
            fullWidth
            value={props.address}
            onChange={(e) => props.setAddress(e.target.value)}
            type="address"
            helperText="Address Of Shop"
            autoComplete="address"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="emailProduct"
            label="Email"
            fullWidth
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
            type="email"
            helperText="Commercial Email"
            autoComplete="email"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="productPhNumber"
            label="Phone Number"
            type="number"
            value={props.phnum}
            onChange={(e) => props.setPhnum(e.target.value)}
            helperText="Commercial Phone Number"
            fullWidth
            autoComplete="number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="razorPayKeyId"
            label="Account No"
            type="password"
            helperText="Your Bank Account Number"
            fullWidth
            value={props.keyId}
            onChange={(e) => props.setKeyId(e.target.value)}
            autoComplete="number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="secretKeyRazorPay"
            label="Code"
            type="password"
            helperText="IFSC Code"
            fullWidth
            value={props.secretKey}
            onChange={(e) => props.setSecretKey(e.target.value)}
            autoComplete="number"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
