import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../../context/GlobalContext";
import { Link } from "react-router-dom";
// import axios from "axios";
import "./orderhistory.css";
const OrderHistory = () => {
  const context = useContext(GlobalContext);
  const { state } = context;
  const [orderHistory, setOrderHistory] = state.userAPI.orderHistory;
  // const [isAdmin] = state.userAPI.isAdmin;
  // const [token] = state.token;



  return (
    <>
      <section className="orderHistory section">
        <h2 className="section_title">Order History </h2>

        <div className="orderHistory_container bd-grid">
          <p>You have {orderHistory.length} orders</p>
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Date of purchase</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.paymentID}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link style={{ color: "blue", fontWeight: "700" }} to={`/orderhistory/${item._id}`}>
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default OrderHistory;
