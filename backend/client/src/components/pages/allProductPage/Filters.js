import React, { useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";

const Filters = () => {
  const context = useContext(GlobalContext);
  const { state } = context;
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productAPI.category;
  const [sort, setSort] = state.productAPI.sort;
  const [search, setSearch] = state.productAPI.search;

  const handelCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };
  return (
    <div className="filter_menu bd-grid">
      <input type="text" value={search} placeholder="Enter yours search!" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
      <div>
        <div className="row">
          <span>Filters:</span>
          <select name="category" value={category} onChange={handelCategory}>
            <option value="">All Products</option>
            {categories.map((category) => (
              <option value={"category=" + category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <span>Sort By:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Newest</option>
            <option value="sort=oldest">Oldest</option>
            <option value="sort=-sold">Best sales</option>

            <option value="sort=-price">Price: High-Low</option>
            <option value="sort=price">Price: Low-High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
