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
import ProductDetails from "./ProductDetails";
import VerificationForm from "./VerificationForm";
import Review from "./Review";
import axios from "axios";
import { CatchingPokemonTwoTone } from "@mui/icons-material";
import * as c from "../../utils/Colors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import ButtonUI from "./subcomponents/Button";
import { useRouter } from "next/router";
import { products as pds, products } from "../../utils/Data";
import { interpolateAs } from "next/dist/shared/lib/router/router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

  const router = useRouter();
  const steps = ["Info", "Verify", "Preview"];

  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState(null);
  const [price, setPrice] = React.useState(-1);
  const [brand, setBrand] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [nameOfShop, setNameOfShop] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phnum, setPhnum] = React.useState("");
  const [keyId, setKeyId] = React.useState("");
  const [secretKey, setSecretKey] = React.useState("");
  const [pdfOrCodeLink, setPdfOrCodeLink] = React.useState(null);
  const [msg, setMsg] = React.useState(null);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState("success");
  const [alertMsg2, setAlert2] = React.useState(null);

  function getDetails() {
    return {
      nameOfProduct: name,
      category: category,
      imageUrl: imageUrl,
      price: price,
      brand: brand,
      description: description,
      name: nameOfShop,
      address: address,
      email: email,
      phnum: phnum,
      pdfOrCodeLink: pdfOrCodeLink,
    };
  }

  async function hostProduct() {
    try {
      await axios
        .post("/api/products/seed", {
          token: sessionStorage.getItem("collegeBay"),
          product: getDetails(),
          keyId: keyId,
          secretKey: secretKey,
        })
        .then((u) => {
          console.log("here after API request");
          console.log(u);
          handleNext();
        })
        .catch((err) => {
          console.log(err);
          handleNext();
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  function nameHandler(e) {
    if (e.target.value.length > 10) return;

    setName(e.target.value);
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ProductDetails
            name={name}
            category={category}
            price={price}
            brand={brand}
            imageUrl={imageUrl}
            description={description}
            nameHandler={nameHandler}
            setCategory={setCategory}
            setImageUrl={setImageUrl}
            setPrice={setPrice}
            setBrand={setBrand}
            setDescription={setDescription}
            pdfOrCodeLink={pdfOrCodeLink}
            setPdfOrCodeLink={setPdfOrCodeLink}
          />
        );
      case 1:
        return (
          <VerificationForm
            nameOfShop={nameOfShop}
            address={address}
            email={email}
            phnum={phnum}
            keyId={keyId}
            secretKey={secretKey}
            setNameOfShop={setNameOfShop}
            setAddress={setAddress}
            setEmail={setEmail}
            setPhnum={setPhnum}
            setKeyId={setKeyId}
            setSecretKey={setSecretKey}
          />
        );
      case 2:
        return <Review data={getDetails()} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    if (activeStep == 0) {
      if (
        name.length == 0 ||
        category.length == 0 ||
        price == -1 ||
        !imageUrl ||
        brand.length == 0 ||
        description.length == 0
      ) {
        setMsg("All the fields are required");
        setTimeout(() => {
          setMsg(null);
        }, 3000);
        setAlert2(`All the fields are required`);
        setAlertType("error");
        setOpenAlert(true);
        return;
      }

      if (category == "Pdf" || category == "Code") {
        if (!pdfOrCodeLink) {
          setMsg("All the fields are required");
          setTimeout(() => {
            setMsg(null);
          }, 3000);
          setAlert2(`All the fields are required`);
          setAlertType("error");
          setOpenAlert(true);
          return;
        }
      }
    } else if (activeStep == 1) {
      if (
        nameOfShop.length == 0 ||
        address.length == 0 ||
        email.length == 0 ||
        phnum.length == 0 ||
        keyId.length == 0 ||
        secretKey.length == 0
      ) {
        setMsg("All the fields are required");
        setTimeout(() => {
          setMsg(null);
        }, 3000);
        setAlert2(`All the fields are required`);
        setAlertType("error");
        setOpenAlert(true);
        return;
      }
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [index, setIndex] = React.useState(0);
  async function hostProductSeed() {
    try {
      if (index >= pds.length) {
        alert("thats it");
        return;
      }
      const item = pds[index];

      await axios
        .post("/api/products/seed", {
          token: sessionStorage.getItem("collegeBay"),
          product: item,
          keyId: item.keyId,
          secretKey: item.secretKey,
        })
        .then((u) => {
          console.log(`product ${index} seed complete`);
          setIndex(index + 1);
        })
        .catch((err) => {
          alert("somethin went wrong");
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  // return (
  //   <div>
  //     <button onClick={hostProductSeed}>Seed product</button>
  //   </div>
  // );

  return (
    <ThemeProvider theme={theme} elevation={0}>
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
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }} elevation={0}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          elevation={0}
        >
          <Typography
            component="h3"
            variant="h5"
            align="center"
            style={{ fontWeight: "bolder" }}
          >
            {msg ? msg : "Sell Your Product"}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps &&
              steps.map((label) => (
                <Step key={label}>
                  <StepLabel>
                    <div> {label}</div>
                  </StepLabel>
                </Step>
              ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for hosting your product
                </Typography>
                <Typography variant="subtitle1">
                  Your Product Has been added to our Shop
                </Typography>
                <br />
                <div onClick={() => router.push("/")}>
                  <ButtonUI
                    text="Shop Now"
                    width="50%"
                    color={c.c1}
                    status={true}
                    size="10px"
                    handler={null}
                  />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button
                      onClick={handleBack}
                      sx={{ mt: 3, ml: 1 }}
                      style={{ color: c.c1 }}
                    >
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={
                      activeStep === steps.length - 1 ? hostProduct : handleNext
                    }
                    sx={{ mt: 3, ml: 1, backgroundColor: c.c1 }}
                  >
                    {activeStep === steps.length - 1
                      ? "Host Your Product"
                      : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
