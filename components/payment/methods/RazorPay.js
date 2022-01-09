import axios from "axios";
import * as React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";

function RazorPay(props) {
  const theme = createTheme();
  const matches = useMediaQuery("(min-width:650px)");

  const paymentSuccessful = async (
    response,
    details,
    receipt,
    userEmail,
    amount
  ) => {
    alert("payment successful do whatever you like with this data");
    console.log("payment successful----------------------------");
    console.log(response);
    console.log(details);
    console.log(receipt);

    console.log("Invoice Data");
    const invoiceData = {
      receipt: receipt,
      paymentId: response.data.paymentId,
      orderId: response.data.orderId,
      //   cart: cart,
      amountPaid: amount / 100,
      paidOn: response.headers.date,
      name: details.name,
      email: userEmail,
      phnum: details.phnum,
      address: details.address1,
      city: details.city,
      country: details.country,
      state: details.state,
      pincode: details.pinCode,
    };

    console.log(invoiceData);
    props.razorPayPaymentSuccessful(invoiceData);
    console.log("payment successful----------------------------");
  };
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayTheRazorPay = async () => {
    const userDetails = props.userDetails;

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Sorry, We are experiencing Technical Issue");
      console.log("Razorpay Checkout Script Load Error");
      return;
    }

    const result = await axios.post("/api/payment/razorpay", {
      amount: props.amount,
      token: sessionStorage.getItem("collegeBay"),
    });

    if (!result) {
      alert("Sorry, We are experiencing technical Issue"); //TODO: redirect to failure page with Sorry, we are experiencing technical issue
      alert("Order creation failed");
      return;
    }

    const {
      amt: amt,
      id: order_id,
      currency: currency,
      key_id: key_id,
      receipt: receiptId,
      email: userEmail,
    } = result.data;

    const options = {
      key: key_id,
      amount: amt.toString(),
      currency: currency,
      name: "College Bay",
      description: "CollegBay - Upcoming Trillion Dollor Company",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          uid: userDetails.name,
          email: userEmail,
          amt: amt,
        };
        const result = await axios.post("/api/payment/verifyrazorpay", data);
        if (result["data"]["status"] == 1) {
          paymentSuccessful(result, userDetails, receiptId, userEmail, amt);
        } else {
          alert("payment failed");
          router.push("/");
        }
      },
      prefill: {
        name: userDetails.name,
        contact: "" + userDetails.phnum,
        email: userEmail,
      },
      customer: {
        name: userDetails.name,
        contact: "" + userDetails.phnum,
        email: userEmail,
      },
      notes: {
        address: "CollegeBay Private Limited",
      },
      theme: {
        color: "#FFCC00",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          onClick={displayTheRazorPay}
          style={{
            backgroundColor: "#FFCC00",
            width: matches ? "250px" : "150px",
          }}
        >
          Pay ₹{props.amount}
        </Button>
      </ThemeProvider>
    </div>
  );
}

export default RazorPay;
