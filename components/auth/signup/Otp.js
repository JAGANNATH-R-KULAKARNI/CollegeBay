import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import * as c from "../../../utils/Colors";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import OtpInput from "react-otp-input";

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

  const [otp, setOtp] = React.useState("");

  return (
    <React.Fragment>
      <p
        style={{
          textAlign: "center",
          fontSize: m1 ? "36px" : "20px",
          fontWeight: 900,
        }}
      >
        One-Time-Password
      </p>

      <p
        style={{
          textAlign: "center",
          fontWeight: 500,
          fontSize: m1 ? "20px" : "12px",
        }}
      >
        You have received OTP to your email mate.
      </p>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <OtpInput
          value={otp}
          isInputNum={true}
          onChange={(e) => setOtp(e)}
          numInputs={4}
          separator={<span>-jk-</span>}
          inputStyle={{
            fontSize: m1 ? "50px" : "40px",
            borderColor: c.c1,
          }}
        />
      </div>
    </React.Fragment>
  );
}
