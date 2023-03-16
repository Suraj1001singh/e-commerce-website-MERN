import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import "./header.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [active, setActive] = useState(false);
  const [countItem, setCountItem] = useState(0);
  const history = useHistory();
  const context = useContext(GlobalContext);
  const { state } = context;
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  //--------------logging out user------------

  const logout = async () => {
    const res = await axios.get("/user/logout");
    setIsAdmin(false);
    setIsLogged(false);

    alert(res.data.msg);
    history.push("/");
  };
  //-------------------------------------------
  //---------------going to cart--------------
  const goToCart = () => {
    if (isLogged) {
      history.push("/checkout");
      return;
    }
    alert("Please Login to continue buying");
  };
  //-----------------------------------------
  const numberOfCartItems = () => {
    var count = 0;
    cart.forEach((item) => {
      count += parseInt(item.quantity);
    });
    setCountItem(count);
  };
  const handelOnClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    numberOfCartItems();
  }, [cart]);
  return (
    <header className="l-header" id="header">
      <nav className="nav bd-grid">
        <div className="nav_toggle" id="nav_toggle">
          <i className="bx bxs-grid" onClick={handelOnClick}></i>
        </div>
        <Link to={"/"}>
          <a className="nav_logo">EasyCart</a>
        </Link>

        <div className={active ? "nav_menu show" : "nav_menu"} id="nav_menu">
          <ul className="nav_list">
            <li className="nav_item" onClick={handelOnClick}>
              <a href="#" className="nav_link">
                <Link to="/">Home</Link>
              </a>
            </li>

            <li className="nav_item" onClick={handelOnClick}>
              <a href="" className="nav_link ">
                <Link to="/allProducts">All Products</Link>
              </a>
            </li>
            {isLogged ? (
              <li className="nav_item" onClick={handelOnClick}>
                <a href="" className="nav_link ">
                  <Link to="/orderhistory">Your Orders</Link>
                </a>
              </li>
            ) : null}

            <li className="nav_item">
              {isLogged ? (
                <a className="nav_link " onClick={logout}>
                  <i class="bx bxs-lock-open logout_icon"></i>Logout
                </a>
              ) : (
                <a className="nav_link ">
                  <Link to="/login">
                    <i class="bx bxs-lock login_icon"></i>Login
                  </Link>
                </a>
              )}
            </li>
          </ul>
        </div>
        <div className={isAdmin ? "nav_shop dropdown " : "nav_shop"}>
          {isAdmin ? (
            <a className="">
              <i class="fas fa-user-shield admin_icon"></i>

              <span>Admin</span>
              <div class="dropdown-content">
                <Link to={"/createproducts"}>Add Products</Link>
                <Link to="/categories">Add Categories</Link>
              </div>
            </a>
          ) : (
            <div style={{ position: "relative" }}>
              <i className="bx bx-shopping-bag cart_icon" onClick={goToCart}></i>
              {isLogged && countItem != 0 ? <a className="bagder">{countItem}</a> : null}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
