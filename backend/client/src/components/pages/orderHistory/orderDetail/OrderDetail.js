import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import GlobalContext from "../../../../context/GlobalContext";
import Loader from "../../../loader/Loader";
import "./orderdetail.css";
const OrderDetail = () => {
  const context = useContext(GlobalContext);
  const { state } = context;
  const [orderHistory] = state.userAPI.orderHistory;
  const [orderDetail, setOrderDetail] = useState([]);


  const params = useParams();

  //--------------------------------------------------------------
  useEffect(() => {
    if (params.id) {
      orderHistory.forEach((item) => {
        if (item._id === params.id) {
          setOrderDetail(item);
        }
      });
    }
  }, [params.id, orderHistory]);

  return (
    <>
      {orderDetail.length === 0 ? (
        <Loader></Loader>
      ) : (
        <section className="orderHistory section">
          <h2 className="section_title">Order Details </h2>

          <div className="orderHistory_container bd-grid">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Postal Code</th>
                  <th>COuntry Code</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{orderDetail.address.recipient_name}</td>
                  <td>{orderDetail.address.line + "-" + orderDetail.address.city}</td>
                  <td>{orderDetail.address.postal_code}</td>
                  <td>{orderDetail.address.country_code}</td>
                </tr>
              </tbody>
            </table>

            <table style={{ marginTop: "3rem" }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty.</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.cart.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <Link to={`/detail/${item._id}`}>
                          <img className="orderdetail_product_img" src={item.images[item.images.length-1].url} alt=""></img>
                          <span>{item.title}</span>
                        </Link>
                      </td>

                      <td>{item.quantity}</td>
                      <td>$ {item.price * item.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
           
          </div>
        </section>
      )}
    </>
  );
};

export default OrderDetail;
