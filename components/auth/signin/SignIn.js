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
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Email from "./Email";
import Password from "./Password";
import * as c from "../../../utils/Colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import ButtonUI from "../../../utils/Button";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function SignIn() {
  const router = useRouter();

  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState("success");
  const [gifStatus, setGifStatus] = React.useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Email", "password"];
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [alertMsg, setAlert] = React.useState(null);
  const [alertMsg2, setAlert2] = React.useState(null);

  const messageAlert = async (msg) => {
    setAlert(msg);
    setTimeout(() => {
      setAlert(null);
    }, 4000);
    return;
  };

  const login = async () => {
    if (!email.length || !password.length) alert("All the fields are required");

    try {
      await axios
        .post("/api/auth/signin", {
          email: email,
          password: password,
        })
        .then((u) => {
          console.log(u["data"]);

          if (u["data"].status) {
            setAlertType("success");
            setOpenAlert(true);
            setAlert2(u["data"].message);
            sessionStorage.setItem("collegeBay", u["data"].token);

            setTimeout(() => {
              router.push("/");
            }, 1000);
          } else {
            setAlertType("error");
            setOpenAlert(true);
            setAlert2(u["data"].message);
          }
        })
        .catch((err) => {
          setAlertType("error");
          setOpenAlert(true);
          setAlert2("Something went wrong");
        });
    } catch (err) {
      setAlertType("error");
      setOpenAlert(true);
      setAlert2("Something went wrong");
    }
  };

  const handleNext = () => {
    if (activeStep == 0 && !email.match(validEmail)) {
      messageAlert("Email should be valid");
      return;
    } else if (activeStep == 1 && password.length == 0) {
      messageAlert("Enter your Password !");
      return;
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Email email={email} setEmail={setEmail} alertMsg={alertMsg} />;
      case 1:
        return (
          <Password
            password={password}
            setPassword={setPassword}
            alertMsg={alertMsg}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  React.useEffect(() => {
    if (sessionStorage.getItem("collegeBay")) {
      router.push("/");
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{
          width: m1 ? "20%" : "80%",
          paddingLeft: m1 ? "0%" : "10%",
          textAlign: "center",
        }}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity={alertType}
          sx={{ width: "100%", textAlign: "center" }}
        >
          {alertMsg2}
        </Alert>
      </Snackbar>
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
                <h1 style={{ textAlign: "center" }}>Processing...</h1>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div style={{ height: "30px" }}></div>
                <Box
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <ButtonUI
                    clicked={
                      activeStep === steps.length - 1 ? login : handleNext
                    }
                    text={activeStep === steps.length - 1 ? "Let's go" : "Next"}
                    width={m1 ? "300px" : "230px"}
                    height="70px"
                  />
                  <br />
                  {activeStep == steps.length - 1 ? (
                    <ButtonUI
                      clicked={handleBack}
                      text="Back"
                      width={m1 ? "300px" : "230px"}
                      height="70px"
                    />
                  ) : null}
                  {activeStep == 0 ? (
                    <ButtonUI
                      clicked={() => router.push("/auth/signup")}
                      text="Sign Up"
                      width={m1 ? "300px" : "230px"}
                      height="70px"
                    />
                  ) : null}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
