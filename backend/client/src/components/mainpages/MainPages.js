import React from "react";
import "./mainPage.css";
import HomeImage from "../../assets/imghome.png";
import { Link } from "react-router-dom";

const MainPages = () => {
  return (
    <main>
      <section className="home" id="home">
        <div className="home_container bd-grid">
          <div className="home_sneaker">
            <div className="home_shape"></div>
            <img src={HomeImage} alt="" className="home_img"></img>
          </div>
          <div className="home_data">
            <span className="home_new">New in</span>
            <h1 className="home_title">
              YEEZY BOOST
              <br />
              SPLY - 350
            </h1>
            <p className="home_description">Explore the new collection of sneakers</p>
            <Link to={"/allProducts"}>
              <a className="button">Explore now</a>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPages;
