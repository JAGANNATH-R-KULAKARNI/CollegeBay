import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import * as c from "../../../utils/Colors";

export default function RadioButtonsGroup(props) {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        value={props.data.paymentType}
        name="radio-buttons-group"
        onChange={(e) => props.data.setPaymentType(e.target.value)}
      >
        <FormControlLabel
          value={0}
          control={<Radio style={{ color: c.c1 }} />}
          label="RazorPay"
        />
        <FormControlLabel
          value={1}
          control={<Radio style={{ color: c.c1 }} />}
          label="Cash On Meet"
        />
      </RadioGroup>
    </FormControl>
  );
}
