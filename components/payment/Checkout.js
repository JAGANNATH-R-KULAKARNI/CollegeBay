import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import PayPalUI from "./methods/PayPal";

const steps = ["Shipping address", "Payment details", "Review your order"];

const theme = createTheme();

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [name, setName] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [phnum, setPhnum] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");
  const [country, setCountry] = React.useState("");

  const [paymentType, setPaymentType] = React.useState(0);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            name={name}
            address1={address1}
            phnum={phnum}
            city={city}
            state={state}
            pinCode={pinCode}
            country={country}
            setName={setName}
            setAddress1={setAddress1}
            setPhnum={setPhnum}
            setCity={setCity}
            setState={setState}
            setPinCode={setPinCode}
            setCountry={setCountry}
          />
        );
      case 1:
        return (
          <PaymentForm
            paymentType={paymentType}
            setPaymentType={setPaymentType}
          />
        );
      case 2:
        return <Review totalAmount={props.totalAmount} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const checkIt = () => {
    if (
      name.length == 0 ||
      address1.length == 0 ||
      phnum.length == 0 ||
      city.length == 0 ||
      state.length == 0 ||
      pinCode.length == 0 ||
      country.length == 0
    )
      return false;

    return true;
  };

  const handleNext = () => {
    if (!checkIt()) {
      alert("All the fields are required");
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getUserDetails = () => {
    return {
      name: name,
      address1: address1,
      city: city,
      state: state,
      pinCode: pinCode,
      country: country,
      phnum: phnum,
    };
  };

  const PAYMENT_BUTTON =
    paymentType == 0 ? (
      <PayPalUI
        totalAmount={props.amountUSD}
        deleteCartItem={props.deleteCartItem}
        myOrdersUpdate={props.myOrdersUpdate}
        userDetails={getUserDetails()}
      />
    ) : paymentType == 1 ? (
      <h2>Stripe</h2>
    ) : (
      <h2>Cash</h2>
    );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    PAYMENT_BUTTON
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
