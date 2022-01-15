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
import Name from "./Name";
import Email from "./Email";
import Password from "./Password";
import Otp from "./Otp";
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

export default function SignUp() {
  const router = useRouter();

  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState("success");
  const [gifStatus, setGifStatus] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Name", "Email", "Password", "Verify"];
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otpG, setOtpG] = React.useState(null);
  const [otpU, setOtpU] = React.useState(null);
  const [alertMsg, setAlert] = React.useState(null);
  const [alertMsg2, setAlert2] = React.useState(null);
  const [sec, setSec] = React.useState("");

  const messageAlert = async (msg) => {
    setAlert(msg);
    setTimeout(() => {
      setAlert(null);
    }, 4000);
    return;
  };
  const generateUser = async () => {
    try {
      await axios
        .post("/api/auth/signup", {
          name: name,
          email: email,
          password: password,
        })
        .then((u) => {
          console.log(u["data"]);
          messageAlert(u["data"].message);

          if (u["data"].status) {
            setGifStatus(true);
            setAlert2(`Successfully signed in`);
            setAlertType("success");
            setOpenAlert(true);
            setTimeout(() => {
              router.push("/auth/signin");
            }, 3000);

            return 1;
          } else {
            setAlert2(u["data"].message);
            setAlertType("error");
            setOpenAlert(true);
            setTimeout(() => {
              window.location.reload();
            }, 3000);

            return 0;
          }
        })
        .catch((err) => {
          messageAlert("Something went wrong");
          return 0;
        });
    } catch (err) {
      messageAlert("Something went wrong");
      return 0;
    }
  };

  const generateOTP = async () => {
    try {
      const refe = Math.floor(Math.random() * 10000 + 1);
      setOtpG(refe);

      await axios
        .post("/api/sendgridmail", {
          name: name,
          otp: refe,
          email: email,
        })
        .then((u) => {
          setAlert2(`OTP has been sent to ${email}`);
          setAlertType("success");
          setOpenAlert(true);
        })
        .catch((err) => {
          setAlert2(`Failed to send OTP to ${email}`);
          setAlertType("error");
          setOpenAlert(true);
        });
    } catch (err) {
      setAlert2(`Something went wrong`);
      setAlertType("error");
      setOpenAlert(true);
    }
  };

  const otpCheck = (otp) => {
    setOtpU(otp);

    if (otp == otpG) {
      if (generateUser()) setActiveStep(activeStep + 1);
      else {
        setName("");
        setEmail("");
        setPassword("");
        setOtpU(null);
      }

      return;
    }
  };

  const handleNext = () => {
    if (activeStep == 0 && name.length <= 3) {
      messageAlert("Name should have a minimum of 4 characters");
      return;
    } else if (activeStep == 1 && !email.match(validEmail)) {
      messageAlert("Email should be valid");
      return;
    } else if (activeStep == 2 && password.length < 6) {
      messageAlert("Minimum length of password should be 6");
      return;
    } else if (activeStep == 3) {
      if (otpG != otpU) {
        messageAlert("OTP incorrect");
        return;
      }

      generateUser();

      return;
    }

    if (activeStep == 2) {
      generateOTP();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Name name={name} setName={setName} alertMsg={alertMsg} />;
      case 1:
        return <Email email={email} setEmail={setEmail} alertMsg={alertMsg} />;
      case 2:
        return (
          <Password
            password={password}
            setPassword={setPassword}
            alertMsg={alertMsg}
          />
        );
      case 3:
        return <Otp otp={otpU} setOtp={otpCheck} alertMsg={alertMsg} />;
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
          sx={{ width: "100%" }}
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={
                      gifStatus
                        ? "https://media.giphy.com/media/2tRBdHz4Wwhyw/giphy.gif"
                        : "https://media.giphy.com/media/OiC5BKaPVLl60/giphy.gif"
                    }
                    width={m1 ? "700px" : "300px"}
                    height="auto"
                  />
                </div>
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
                    clicked={handleNext}
                    text={activeStep === steps.length - 1 ? "Let's go" : "Next"}
                    width={m1 ? "300px" : "230px"}
                    height="70px"
                  />
                  <br />
                  {activeStep === steps.length - 1 ? (
                    <div>
                      <ButtonUI
                        clicked={generateOTP}
                        text="Resend OTP"
                        width={m1 ? "300px" : "230px"}
                        height="70px"
                      />

                      <br />
                    </div>
                  ) : null}

                  <ButtonUI
                    clicked={
                      activeStep == 0
                        ? () => router.push("/auth/signin")
                        : handleBack
                    }
                    text={activeStep == 0 ? "Sign In" : "Back"}
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
