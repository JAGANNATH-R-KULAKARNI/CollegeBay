import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButtonsGroup(props) {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        value={props.data.paymentType}
        name="radio-buttons-group"
        onChange={(e) => props.data.setPaymentType(e.target.value)}
      >
        <FormControlLabel value={0} control={<Radio />} label="Pay Pal" />
        <FormControlLabel value={1} control={<Radio />} label="Stripe" />
        <FormControlLabel value={2} control={<Radio />} label="Cash" />
      </RadioGroup>
    </FormControl>
  );
}
