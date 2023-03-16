import React, { useState, useEffect } from "react";
import "./womenCollection.css";
import Product from "../product/Product";
import axios from "axios";
const WomenCollection = () => {
  const id = ["616491dcd4e3c05afd3a8077", "61649215d4e3c05afd3a8084", "6164924dd4e3c05afd3a8094"];
  const [womenProducts, setWomenProducts] = useState([]);

  const getWomenProducts = () => {
    setWomenProducts([]);
    id.forEach(async (id) => {
      const res = await axios.get(`/api/product/${id}`);
      if (res.status === 200) {
        setWomenProducts((prev) => prev.concat(res.data));
      } else {
        alert(res.data.msg);
      }
    });
  };

  useEffect(() => {
    getWomenProducts();
  }, []);
  return (
    <section className="womencollection section" id="women">
      <h2 className="section_title">WOMEN COLLECTION</h2>

      {womenProducts.length === 3 ? (
        <div className="women_container bd-grid">
          {womenProducts.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default WomenCollection;
