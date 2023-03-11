import React, { useContext, useState } from "react";
import "./allproductpage.css";
import GlobalContext from "../../../context/GlobalContext";
import Product from "../../product/Product2";
import LoaderPage from "../../loaderPage/LoaderPage";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";

const AllProductPage = () => {
  const context = useContext(GlobalContext);
  const { state } = context;
  const [products, setProducts] = state.productAPI.products;
  const [callback, setCallback] = state.productAPI.callback;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [isCheck, setIsCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkAll = () => {
    setIsCheck(!isCheck);
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
  };
  const deleteAll = () => {
    try {
      //destroy images
      setLoading(true);
      products.forEach(async (product) => {
        if (product.checked) {
          product.images.forEach(async (image) => {
            await axios.post(
              "/api/destroy",
              { public_id: image.public_id },
              {
                headers: { Authorization: token },
              }
            );
          });
        }
      });

      //delete product
      var msg = "Please Select products";
      products.forEach(async (product, index) => {
        if (product.checked) {
          msg = "All products are deleted";
          const res = await axios.delete(`/api/product/${product._id}`, { headers: { Authorization: token } });
        }

        if (index == products.length - 1) alert(msg);
      });
      setLoading(false);
      setIsCheck(false);
      setCallback(!callback);
    } catch (e) {
      alert(e.response.data.msg);
    }
  };

  return (
    <>
      <section className="allproductpage section">
        <Filters />
        {isAdmin ? (
          <div style={{ margin: "auto" }} className="bd-grid ">
            <div className="delete_all" style={{ display: "block" }}>
              <span>Select All</span>
              <input type="checkbox" checked={isCheck} onChange={checkAll}></input>
              <button onClick={deleteAll} disabled={loading}>
                Delete All
              </button>
            </div>
          </div>
        ) : null}
        <div className="allproductpage_container bd-grid">
          {products.map((product) => {
            return <Product key={product._id} product={product}></Product>;
          })}
        </div>
        <LoadMore />
      </section>
      {products.length === 0 && <LoaderPage loaderText="Fetching products..." />}
    </>
  );
};

export default AllProductPage;
