import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

export default function AddressForm() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Describe Product
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="nameOfProduct"
            name="nameOfProduct"
            label="Name Of Product"
            fullWidth
            type="name"
            autoComplete="name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              Category Of Product
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="categoryOfProduct"
              fullWidth
              label="Category Of Product"
            >
              <MenuItem value={10}>Book</MenuItem>
              <MenuItem value={20}>Pdf</MenuItem>
              <MenuItem value={30}>Instrument</MenuItem>
              <MenuItem value={30}>Code</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {/* <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          /> */}
          Image DropBox
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="price"
            name="price"
            label="Set a Price"
            fullWidth
            type="number"
            autoComplete="price"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="brand"
            name="brand"
            label="Brand Name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={3}>
          Description Of Product (minimum 50 words)
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="DescriptionOfProduct"
            label="Description"
            fullWidth
            multiline
            rows={4}
            defaultValue=""
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
