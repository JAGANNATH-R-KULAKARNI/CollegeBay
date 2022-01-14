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
import Name from "./Name";
import Email from "./Email";
import Password from "./Password";
import Otp from "./Otp";
import * as c from "../../../utils/Colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import ButtonUI from "../../../utils/Button";

const steps = ["Name", "Email", "Password", "Verify"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Name />;
    case 1:
      return <Email />;
    case 2:
      return <Password />;
    case 3:
      return <Otp />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function Checkout() {
  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ height: "70px" }}></div>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          style={{ backgroundColor: "inherit", color: c.c1 }}
          elevation={0}
        >
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
                <div style={{ height: "30px" }}></div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {activeStep !== 0 && (
                    <ButtonUI clicked={handleBack} text="Back" />
                  )}

                  <ButtonUI
                    clicked={handleNext}
                    text={
                      activeStep === steps.length - 1 ? "Place order" : "Next"
                    }
                    width={m1 ? "300px" : "230px"}
                    height="70px"
                  />
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
