import React, { useState, useEffect } from "react";
import "./newcollection.css";
import image1 from "../../assets/new1.png";
import axios from "axios";
import { Link } from "react-router-dom";

const NewCollection = () => {
  const id = ["616515d4b6a72ac94239b11b", "61651602b6a72ac94239b128", "6165162ab6a72ac94239b136", "6165164eb6a72ac94239b140"];
  const [newcollection, setNewCollection] = useState([]);

  const getNewCollection = () => {
    setNewCollection([]);
    id.forEach(async (id) => {
      const res = await axios.get(`/api/product/${id}`);
      if (res.status === 200) {
        setNewCollection((prev) => prev.concat(res.data));
      } else {
        alert(res.data.msg);
      }
    });
  };

  useEffect(() => {
    getNewCollection();
  }, []);

  return (
    <section className="newcollection section" id="new">
      <h2 className="section_title">NEW COLLECTION</h2>

      {newcollection.length === 4 ? (
        <div className="new_container bd-grid">
          <div className="new_mens">
            <img src={image1} alt="" className="new_mens_img"></img>
            <h3 className="new_title">Mens shoes</h3>
            <span className="new_price"> From $99</span>
            <a href="#" className="button_light">
              View Collection<i className="bx bx-right-arrow-alt button_icon"></i>
            </a>
          </div>
          <div className="new_sneaker">
            {newcollection.map((product) => (
              <div key={product._id} className="new_sneaker_card">
                <img src={product.images[0].url} alt="" className="new_sneaker_img"></img>
                <div className="new_sneaker_overlay">
                  <Link to={`/detail/${product._id}`}>
                    <a className="button">View</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default NewCollection;
