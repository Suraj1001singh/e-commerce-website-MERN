import React, { useState, useContext, useEffect } from "react";
import "./productoverview.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import GlobalContext from "../../context/GlobalContext";
import Product2 from "../product/Product2";
import axios from "axios";
import $ from "jquery";
const ProductOverview = () => {
  const params = useParams();
  const history = useHistory();
  const context = useContext(GlobalContext);
  const { state } = context;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [products] = state.productAPI.products;
  const [categories] = state.categoriesAPI.categories;
  const [callback, setCallback] = state.productAPI.callback;
  const [category, setCategory] = useState("");
  const [detailProduct, setDetailProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [imageIndex, setImageIndex] = useState(0);

  //---------------Getting ID and manupulating it--------
  $(document).ready(function () {
    $(".extra_img").click(function (event) {
      setImageIndex(event.target.id.split("_")[1]);
    });
  });
  //-----------------------------------------------
  //--------------------setting category-----------------
  const getCategory = (id) => {
    categories.forEach((category) => {
      if (category._id == id) setCategory(category.name);
    });
  };
  //-------------------Add to cart----------------
  const handelAddToCart = () => {
    state.userAPI.addCart(detailProduct);
  };
  const handelOnClickEdit = (id) => {
    history.push(`/editproduct/${id}`);
  };

  const handelOnClickDelete = async (id) => {
    try {
      //destroy images

      // const destroying = axios.post(
      //   "/api/destroy",
      //   { public_id: product.images.public_id },
      //   {
      //     headers: { Authorization: token },
      //   }
      // );

      //delete product
      const res = await axios.delete(`/api/product/${id}`, { headers: { Authorization: token } });
      setCallback(!callback);
      history.push("/allProducts");
      alert(res.data.msg);
    } catch (e) {
      alert(e.response.data.msg);
    }
  };
  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
          setImages(product.images);
          setMainImage(product.images[product.images.length - 1]);
          getCategory(product.category);
        }
      });
    }
  }, [params.id, products]);

  useEffect(() => {
    if (images.length != 0) setMainImage(images[imageIndex]);
  }, [imageIndex]);

  if (detailProduct.length === 0) return null;

  return (
    <>
      <section className="productoverview section">
        <div className="productoverview_container bd-grid">
          <div className="product_view">
            <div className="product_mainimage">
              <img src={mainImage.url} alt="" className="product_main_img"></img>
            </div>
            <div className="product_otherimage">
              {detailProduct.images.map((image, index) => (
                <div className="extra_img" id={`image_${index}`}>
                  <img src={image.url} alt="" id={`image_${index}`}></img>
                </div>
              ))}
            </div>
          </div>
          <div className="product_details">
            <div className="product_category">{category}</div>
            <h2 className="product_title">{detailProduct.title}</h2>
            <span className="product_price">${detailProduct.price}</span>
            <span className="product_size_selctor">M</span>
            {isAdmin ? (
              <div className="product2_action" style={{ justifyContent: "start" }}>
                <button onClick={() => handelOnClickDelete(detailProduct._id)}>DELETE</button>
                <button onClick={() => handelOnClickEdit(detailProduct._id)}>EDIT</button>
              </div>
            ) : (
              <a className="button" onClick={handelAddToCart}>
                Add to cart
              </a>
            )}

            <span className="product_detail_text">PRODUCT DETAIL</span>
            <p className="product_detail">{detailProduct.description}</p>
          </div>
        </div>
      </section>
      <section className="reletedproducts section">
        <h2 className="section_title"> RELATED PRODUCTS</h2>
        <div className="reletedproducts_container bd-grid">
          {products.map((product) => {
            return product.category === detailProduct.category && product._id !== detailProduct._id ? <Product2 key={product._id} product={product}></Product2> : null;
          })}
        </div>
      </section>
    </>
  );
};

export default ProductOverview;
