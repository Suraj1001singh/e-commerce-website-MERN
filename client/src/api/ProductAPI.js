import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductAPI = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  const getProducts = async () => {
    const res = await axios.get(`/api/product?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`);
    setProducts(res.data.products);
    setResult(res.data.result);
  };
  useEffect(() => {
    getProducts();
  }, [callback,category,sort,search,page]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
};

export default ProductAPI;
