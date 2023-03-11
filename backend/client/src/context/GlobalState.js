import GlobalContext from "./GlobalContext";
import ProductAPI from "../api/ProductAPI";
import UserAPI from "../api/UserAPI";
import CategoriesAPI from "../api/CategoriesAPI";
import React, { useState, useEffect } from "react";
import axios from "axios";

const GlobalState = (props) => {
  const [token, setToken] = useState(false);

  const state = {
    token: [token, setToken],
    productAPI: ProductAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(token),
  };

  //getting acess token and setting it
  useEffect(() => {
    const refreshToken = async () => {
      const refresh = await axios.get("/user/refresh_token");
      setToken(refresh.data.accesstoken);
      setTimeout(() => {
        refreshToken();
      }, 15000);
    };

    refreshToken();
  }, []);
  return <GlobalContext.Provider value={{ state }}>{props.children}</GlobalContext.Provider>;
};
export default GlobalState;
