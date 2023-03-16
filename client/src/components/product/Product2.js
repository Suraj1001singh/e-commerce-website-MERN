import React, { useContext } from "react";
import "./product2.css";
import { Link } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Product2 = ({ product }) => {
  const history = useHistory();
  const context = useContext(GlobalContext);
  const { state } = context;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [products, setProducts] = state.productAPI.products;
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
      const product = await axios.get(`/api/product/${id}`);
      product.data.images.forEach(async (image) => {
        await axios.post(
          "/api/destroy",
          { public_id: image.public_id },
          {
            headers: { Authorization: token },
          }
        );
      });
      //delete product
      const res = await axios.delete(`/api/product/${id}`, { headers: { Authorization: token } });
      setCallback(!callback);
      alert(res.data.msg);
    } catch (e) {
      alert(e.response.data.msg);
    }
  };

  const handelCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  return (
    <article className="sneakers2">
      {isAdmin && <input type="checkbox" style={{ position: "absolute", width: "1.5rem", height: "1.5rem", top: "0", left: "0" }} checked={product.checked} onChange={() => handelCheck(product._id)}></input>}
      <Link style={{ display: "flex", flexDirection: "column" }} to={`/detail/${product._id}`}>
        <img src={product.images[product.images.length - 1].url} alt="" className="sneaker_img2"></img>
        <span className="sneaker_name2">{product.title}</span>
      </Link>
      <span className="sneaker_price2"> ${product.price}</span>
      {isAdmin ? (
        <div className="product2_action">
          <button onClick={() => handelOnClickDelete(product._id)}>DELETE</button>
          <button onClick={() => handelOnClickEdit(product._id)}>EDIT</button>
        </div>
      ) : (
        <a className="button_light" onClick={handelAddToCart}>
          Add to cart<i className="bx bx-right-arrow-alt button_icon"></i>
        </a>
      )}
    </article>
  );
};

export default Product2;
