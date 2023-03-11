import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer section">
      <div className="footer_container bd-grid">
        <div className="footer_box">
          <h3 className="footer_title">Roby</h3>
          <p className="footer_description">New collection of shoes 2021</p>
        </div>
        <div className="footer_box">
          <h3 className="footer_title">EXPLORE</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#featured">Featured</a>
            </li>
            <li>
              <a href="#women">Women</a>
            </li>
            <li>
              <a href="#new">New</a>
            </li>
            <li>
              <Link to={"/allProducts"}>All Products</Link>
            </li>
          </ul>
        </div>
        <div className="footer_box">
          <h3 className="footer_title">SUPPORT</h3>
          <ul>
            <li>
              <a href="#"></a>Product help
            </li>
            <li>
              <a href="#"></a>Customer care
            </li>
            <li>
              <a href="#"></a>Authorised service
            </li>
          </ul>
        </div>
        <div className="footer_box">
          <a href="#" className="footer_social">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="#" className="footer_social">
            <i className="bx bxl-instagram"></i>
          </a>
          <a href="#" className="footer_social">
            <i className="bx bxl-twitter"></i>
          </a>
          <a href="#" className="footer_social">
            <i className="bx bxl-google"></i>
          </a>
        </div>
      </div>
      <p className="footer_copy">&#169; 2021 Draco. All right reserved</p>
    </footer>
  );
};

export default Footer;
