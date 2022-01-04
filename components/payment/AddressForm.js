import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

//   activeStep = { activeStep };
//   firstName = { firstName };
//   lastName = { lastName };
//   address1 = { address1 };
//   address2 = { address2 };
//   city = { city };
//   state = { state };
//   pinCode = { pinCode };
//   country = { country };
export default function AddressForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            value={props.firstName}
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => props.setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={props.lastName}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => props.setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={props.address1}
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={(e) => props.setAddress1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            value={props.address2}
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={(e) => props.setAddress2(e.target.value)}
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
      </Grid>
    </React.Fragment>
  );
}
