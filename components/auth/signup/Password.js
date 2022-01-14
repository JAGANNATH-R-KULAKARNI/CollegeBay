import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import * as c from "../../../utils/Colors";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const useStyles = makeStyles((theme) => ({
  input: {
    color: c.c1,
  },
  palette: {
    primary: {
      main: c.c1, //your color
    },
  },
}));

export default function Email() {
  const classes = useStyles();
  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

  return (
    <React.Fragment>
      <p
        style={{
          textAlign: "center",
          fontSize: m1 ? "36px" : "20px",
          fontWeight: 900,
        }}
      >
        Password
      </p>

      <p
        style={{
          textAlign: "center",
          fontWeight: 500,
          fontSize: m1 ? "20px" : "12px",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        OK Its almost done. Keep a password having minimum length of 6.
      </p>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={"password"}
            // value={values.password}
            // onChange={handleChange("password")}

            label="Password"
            sx={{
              input: {
                color: c.c1,
              },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderColor: c.c1,
                },
              },
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: c.c1,
                },
              },
              "& .MuiFormLabel-root": { color: c.c1, fontWeight: 100 },
            }}
          />
        </FormControl>
      </div>
    </React.Fragment>
  );
}
