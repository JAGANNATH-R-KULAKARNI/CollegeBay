import { PayPalButton } from "react-paypal-button-v2";

function Paypal(props) {
  return (
    <PayPalButton
      amount={props.totalAmount}
      currency="USD"
      shippingPreference="NO_SHIPPING"
      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
      onSuccess={(details, data) => {
        alert("Transaction completed by " + details.payer.name.given_name);

        props.deleteCartItem();
        return fetch("/paypal-transaction-complete", {
          method: "post",
          body: JSON.stringify({
            orderID: data.orderID,
          }),
        });
      }}
    />
  );
}

export default Paypal;
