import React, { useState, useEffect } from "react";
import "./features.css";
import Product from "../product/Product";
import axios from "axios";

const Features = () => {
  const id = ["61646b749c76c2ba9139e499", "6164755bd4e3c05afd3a7ba0", "6164758cd4e3c05afd3a7bad"];
  const [featuredProduct, setFeaturedProduct] = useState([]);

  const getFeaturedProducts = () => {
    setFeaturedProduct([]);
    id.forEach(async (id) => {
      const res = await axios.get(`/api/product/${id}`);
      if (res.status === 200) {
        setFeaturedProduct((prev) => prev.concat(res.data));
      } else {
        alert(res.data.msg);
      }
    });
  };
 
  useEffect(() => {
    getFeaturedProducts();
  }, []);

  
  return (
    <section className="featured section" id="featured">
      <h2 className="section_title">FEATURED</h2>

      {featuredProduct.length === 3 ? (
        <div className="featured_container bd-grid">
          {featuredProduct.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default Features;
