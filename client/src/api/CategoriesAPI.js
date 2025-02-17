import axios from "axios";
import React, { useState, useEffect } from "react";

const CategoriesAPI = (token) => {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    };
    getCategories();
  }, [callback]);

  return { categories: [categories, setCategories],callback: [callback, setCallback], };
};

export default CategoriesAPI;
