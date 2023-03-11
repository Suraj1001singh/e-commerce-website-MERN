import axios from "axios";
import React, { useState, useEffect } from "react";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  //-------for autorefreshing order history whenver callback status is changed
  const [callback, setCallback] = useState(false);

  //----------------setting order history-------
  useEffect(() => {
   
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setOrderHistory(res.data);
        } else {
          const res = await axios.get("/user/orderhistory", {
            headers: { Authorization: token },
          });
          
          setOrderHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, callback, isAdmin]);
  //--------------------------------------------

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/info", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setCart(res.data.cart);
        } catch (e) {
          alert(e.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  // ------------------cart------------------
  const addCart = async (product) => {
    if (!isLogged) return alert("Please to continue buying");
    setCart([...cart, { ...product, quantity: 1 }]);
    const res = await axios.patch(
      "/user/addcart",
      { cart: [...cart, { ...product, quantity: 1 }] },
      {
        headers: { Authorization: token },
      }
    );
    alert(`${product.title} ${res.data.msg}`);
  };

  const updateCart = async (id) => {
    try {
      const res = await axios.patch(
        "/user/deletefromcart",
        { id: id },
        {
          headers: { Authorization: token },
        }
      );
      alert(res.data.msg);
    } catch (e) {
      alert(e.response.message);
    }
  };
  //----------------------------------------
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    addCart: addCart,
    cart: [cart, setCart],
    updateCart: updateCart,
    orderHistory: [orderHistory, setOrderHistory],
    callback: [callback, setCallback],
  };
};

export default UserAPI;
