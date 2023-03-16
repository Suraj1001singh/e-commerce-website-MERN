import React from "react";
import "./collections.css";
import image1 from "../../assets/collection1.png";
import image2 from "../../assets/collection2.png";

const collections = () => {
  return (
    <section className="collection section">
      <div className="collection_container bd-grid">
        <div className="collection_card">
          <div className="collection_data">
            <h3 className="collection_name">Nike</h3>
            <p className="collection_description">New Collection 2021</p>
            <a href="#" className="button_light">
              Buy now<i className="bx bx-right-arrow-alt button_icon"></i>
            </a>
          </div>
          <img src={image1} alt="" className="collection_img"></img>
        </div>
        <div className="collection_card">
          <div className="collection_data">
            <h3 className="collection_name">Nike</h3>
            <p className="collection_description">New Collection 2021</p>
            <a href="#" className="button_light">
              Buy now<i className="bx bx-right-arrow-alt button_icon"></i>
            </a>
          </div>
          <img src={image2} alt="" className="collection_img"></img>
        </div>
      </div>
    </section>
  );
};

export default collections;
