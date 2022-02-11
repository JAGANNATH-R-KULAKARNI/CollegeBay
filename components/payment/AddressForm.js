import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function AddressForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            value={props.name}
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => props.setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={props.phnum}
            id="number"
            name="phnum"
            label="Phone Number"
            fullWidth
            autoComplete="Phone Number"
            variant="standard"
            onChange={(e) => props.setPhnum(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={props.city}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(e) => props.setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={props.state}
            variant="standard"
            onChange={(e) => props.setState(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            value={props.pinCode}
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={(e) => props.setPinCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={props.country}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={(e) => props.setCountry(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address1"
            name="address1"
            value={props.address2}
            label="Address of your Classroom"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={(e) => props.setAddress1(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
