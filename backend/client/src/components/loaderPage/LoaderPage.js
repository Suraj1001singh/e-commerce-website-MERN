import React from "react";
import Loader from "../loader/Loader";
import "./loaderpage.css";

const NoPageFound = ({ loaderText }) => {
  return (
    <>
      <div className="loaderpage">
        {<Loader></Loader>}
        <span style={{ display: "inline-block" }}>{loaderText}</span>
      </div>
    </>
  );
};

export default NoPageFound;
