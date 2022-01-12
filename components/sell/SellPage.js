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

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [productImage, setProductImage] = React.useState(null);

  const steps = ["Details", "Verify", "Review"];

  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [brand, setBrand] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [nameOfShop, setNameOfShop] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phnum, setPhnum] = React.useState("");
  const [keyId, setKeyId] = React.useState("");
  const [secretKey, setSecretKey] = React.useState("");

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
    };
  }

  async function hostProduct() {
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
      })
      .catch((err) => {
        console.log(err);
      });
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
            setName={setName}
            setCategory={setCategory}
            setImageUrl={setImageUrl}
            setPrice={setPrice}
            setBrand={setBrand}
            setDescription={setDescription}
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
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Sell Your Product
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
                  Your Product Have been added to our Shop
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

                  <Button
                    variant="contained"
                    onClick={
                      activeStep === steps.length - 1 ? hostProduct : handleNext
                    }
                    sx={{ mt: 3, ml: 1 }}
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
