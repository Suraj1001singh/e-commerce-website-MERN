import React, { useContext } from "react";
import "./product.css";
import GlobalContext from "../../context/GlobalContext";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
const Product = ({ product }) => {
  const history = useHistory();
  const context = useContext(GlobalContext);
  const { state } = context;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productAPI.callback;
  //------add to cart
  const handelAddToCart = () => {
    state.userAPI.addCart(product);
  };
  //------editing product
  const handelOnClickEdit = (id) => {
    history.push(`/editproduct/${id}`);
  };
  //-------Deleting product
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
      alert(res.data.msg);
    } catch (e) {
      alert(e.response.data.msg);
    }
  };

  return (
    <article className="sneakers">
      <div className="sneakers_sale">Sale</div>
      <Link to={`/detail/${product._id}`}>
        <img src={product.images[0].url} alt="" className="sneaker_img"></img>
      </Link>
      <span className="sneaker_name">{product.title}</span>
      <span className="sneaker_price"> ${product.price} </span>
      {isAdmin ? (
        <div className="product2_action">
          <button onClick={() => handelOnClickDelete(product._id)}>DELETE</button>
          <button onClick={() => handelOnClickEdit(product._id)}>EDIT</button>
        </div>
      ) : (
        <a onClick={handelAddToCart} className="button_light">
          Add to cart<i className="bx bx-right-arrow-alt button_icon"></i>
        </a>
      )}
    </article>
  );
};

export default Product;
