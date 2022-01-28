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
import DropzoneUI from "./subcomponents/DropZone";
import { PeopleSharp } from "@mui/icons-material";

export default function ProductDetails(props) {
  const [loading, setLoading] = React.useState(false);

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        gutterBottom
        style={{ fontWeight: "bolder", textAlign: "center" }}
      >
        Describe Product
      </Typography>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="nameOfProduct"
            name="nameOfProduct"
            label="Name Of Product(max of 20 characters)"
            fullWidth
            type="name"
            value={props.name}
            onChange={props.nameHandler}
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
              value={props.category}
              onChange={(e) => props.setCategory(e.target.value)}
              label="Category Of Product"
            >
              <MenuItem value="Book">Book</MenuItem>
              <MenuItem value="Pdf">Pdf</MenuItem>
              <MenuItem value="Instrument">Instrument</MenuItem>
              <MenuItem value="Code">Code</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          Upload The Image of Product
          <DropzoneUI
            setImageUrl={props.setImageUrl}
            imageUrl={props.imageUrl}
            setLoading={setLoading}
          />
          {loading ? <h3>Uploading...</h3> : null}
        </Grid>
        {props.category == "Pdf" || props.category == "Code" ? (
          <Grid item xs={12} sm={12}>
            <TextField
              id="pdfOrCodeLink"
              name="name"
              label={`Link of ${props.category}`}
              fullWidth
              type="name"
              value={props.pdfOrCodeLink}
              onChange={(e) => props.setPdfOrCodeLink(e.target.value)}
              variant="standard"
            />
          </Grid>
        ) : null}
        <Grid item xs={12} sm={6}>
          <TextField
            id="price"
            name="price"
            label={
              props.price == 0
                ? "Set a Price"
                : `₹ ${parseFloat(1.1 * props.price).toFixed(1)} (${
                    props.price
                  }+${parseFloat(0.1 * props.price).toFixed(1)}) (10% charges)`
            }
            placeholder="In Rupees"
            fullWidth
            value={props.price == 0 ? null : props.price}
            onChange={(e) => props.setPrice(e.target.value)}
            type="number"
            autoComplete="price"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="brand"
            name="brand"
            value={props.brand}
            onChange={(e) => props.setBrand(e.target.value)}
            label="Branch Name"
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="DescriptionOfProduct"
            label="Description Of Product"
            fullWidth
            multiline
            value={props.description}
            onChange={(e) => props.setDescription(e.target.value)}
            rows={4}
            defaultValue=""
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
