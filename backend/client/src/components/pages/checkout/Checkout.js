import React, { useState, useContext, useEffect } from "react";
import "./checkout.css";
import GlobalContext from "../../../context/GlobalContext";

import axios from "axios";
import PaypalButton from "../payment/paypal/PaypalButton";
const Checkout = () => {
  const [total, setTotal] = useState(0);
  const context = useContext(GlobalContext);
  const { state } = context;
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [callback, setCallback] = state.userAPI.callback;

  //------------------calculating total amout ----------------------

  const totalAmount = () => {
    let count = 0;
    cart.forEach((a) => {
      count = count + parseInt(a.price * a.quantity);
    });
    setTotal(count);
  };

  //---------------------------------------------------------------

  //-------------------------adding to cart--------------------------
  const updateCart = async () => {
    const res = await axios.patch(
      "/user/updatecart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };
  //-----------------------------------------------------------------
  const onHandelClickRemove = (id) => {
    console.log(id);
    setCart(
      cart.filter((a) => {
        if (a._id !== id) return a;
      })
    );
  };

  //---------------------transaction success-------------------------
  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;
    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );
    setCart([]);
    setCallback(!callback);

    alert("You have successfully placed an order.");
  };
  //----------------------------------------------------------------
  useEffect(() => {
    totalAmount();
    updateCart();
  }, [cart]);

  return (
    <section className="checkout section">
      <h2 className="section_title">CART</h2>
      {cart.length === 0 ? (
        <h1 style={{ textAlign: "center", fontSize: "1rem" }}>Cart is empty....</h1>
      ) : (
        <div className="checkout_container bd-grid">
          <div className="checkout_products">
            {/* ---------------------------------------------------------------- */}

            {cart.map((checkoutProduct) => {
              return (
                <div key={checkoutProduct._id} className="checkout_product">
                  <div className="checkout_product_details">
                    <h2>{checkoutProduct.title}</h2>
                    <span>${checkoutProduct.price * checkoutProduct.quantity}</span>
                    <a
                      // --------remove product from cart
                      onClick={() => onHandelClickRemove(checkoutProduct._id)}
                      className="remove_product"
                    >
                      <i class="bx bxs-trash-alt trash_icon"></i>Remove
                    </a>
                  </div>
                  <div className="checkout_product_img">
                    <div>
                      <img src={checkoutProduct.images[checkoutProduct.images.length-1].url} alt=""></img>
                    </div>
                    <span className="product_qty">
                      Qty:
                      <input
                        type="number"
                        name="quantity"
                        value={checkoutProduct.quantity}
                        min="0"
                        max="10"
                        step="1"
                        onChange={(e) => {
                          setCart(
                            cart.filter((a) => {
                              if (a._id !== checkoutProduct._id) return a;
                              a.quantity = e.target.value;
                              return a;
                            })
                          );
                          updateCart();
                        }}
                      ></input>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="subtotal">
            <div className="boldlineseparator"></div>
            <span className="price_detail_text">PRICE DETAILS</span>

            <div>
              <span className="subtotal_key ">Price ({cart.length} items) </span>
              <span className="subtotal_value">${total}</span>
            </div>
            <div>
              <span className="subtotal_key ">Discount</span>
              <span className="subtotal_value">- $10</span>
            </div>
            <div>
              <span className="subtotal_key ">Delivery Charges</span>
              <span className="subtotal_value">FREE</span>
            </div>
            <div>
              <span className="subtotal_value">Total Amount</span>
              <span className="subtotal_value">${total - 10}</span>
            </div>

            <a href="#" className="button checkout_btn">
              <PaypalButton total={total - 10} tranSuccess={tranSuccess}></PaypalButton>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Checkout;
