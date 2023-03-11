import axios from "axios";
import React, { useState, useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";
import "./categories.css";

const Categories = () => {
  const context = useContext(GlobalContext);
  const { state } = context;
  const [categories] = state.categoriesAPI.categories;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [token] = state.token;
  const [category, setCategory] = useState("");
  const [editCategory, setEditCategory] = useState(false);
  const [id, setId] = useState("");

  const handelOnChange = (e) => {
    setCategory(e.target.value);
  };
  //---------------------create category------------
  const handelOnClickSave = async (e) => {
    e.preventDefault();
    try {
      if (editCategory) {
        const res = await axios.put(`/api/category/${id}`, { name: category }, { headers: { Authorization: token } });
        alert(res.data.msg);
      } else {
        const res = await axios.post("/api/category", { name: category }, { headers: { Authorization: token } });
        alert(res.data.msg);
      }
      setEditCategory(false);
      setCategory("");
      setCallback(!callback);
    } catch (e) {
      alert(e.response.data.msg);
    }
  };
  //-------------------------------------------------
  //---------------------edit category------------
  const handelOnClickEdit = (id, name) => {
    setId(id);
    setCategory(name);
    setEditCategory(true);
  };
  //----------------------delete category-----------
  //-----------------------------------------------
  const handelOnClickDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, { headers: { Authorization: token } });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (e) {
      alert(e.response.data.msg);
    }
  };
  //-------------------------------------------------

  return (
    <div className="categories section">
      <h2 className="section_title">Category</h2>
      <div className="categories_container bd-grid">
        <form style={{ margin: "auto", marginTop: "2rem" }} autocomplete="off" onSubmit={handelOnClickSave}>
          <label htmlFor="category">Category</label>
          <input type="text" name="category" value={category} onChange={handelOnChange} required></input>
          <button type="submit">{editCategory ? "Update" : "Add"}</button>
        </form>
        <div className="categories_list">
          {categories.map((category) => (
            <div key={category._id} className="categories_item">
              <input value={category.name}></input>
              <i class="bx bxs-edit" onClick={() => handelOnClickEdit(category._id, category.name)}></i>
              <i class="bx bxs-trash-alt" onClick={() => handelOnClickDelete(category._id)}></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
