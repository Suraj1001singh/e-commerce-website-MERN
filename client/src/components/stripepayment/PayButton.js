import { useContext } from "react";
import axios from "axios";
import GlobalContext from "../../context/GlobalContext";
const url = "http://localhost:3000";

const PayButton = ({ cartItems, tranSuccess }) => {
  const context = useContext(GlobalContext);
  const { state } = context;
  const [token] = state.token;

  const handleCheckout = () => {
    console.log(cartItems, token);
    axios
      .post(
        "/api/create-checkout-session",
        {
          cartItems,
        },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.url) {
          //   tranSuccess();
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;
