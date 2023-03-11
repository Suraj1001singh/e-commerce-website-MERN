const Products = require("../models/productModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    // console.log("before", queryStr);

    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => "$" + match);
    this.query.find(JSON.parse(queryStr));

    // console.log("after", queryStr);
    // console.log(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const productCtrl = {
  //getting all products
  getProducts: async (req, res) => {
    try {
      //   console.log(req.query);
      const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating();
      const products = await features.query;
      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  //get one product
  getProduct: async (req, res) => {
    try {
      const product_id = req.params.id;
      const product = await Products.findById(product_id);
      if (!product) return res.status(400).json({ msg: "Product not found" });
      res.json(product);
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  //add product
  addProduct: async (req, res) => {
    try {
      const { product_id, title, price, description, content, images, category } = req.body;
      if (!images) return res.status(400).json({ msg: "No images are uploaded" });

      const product = await Products.findOne({ product_id });
      if (product) return res.status(400).json({ msg: "This product already exist" });

      const newProduct = new Products({ product_id, title: title.toLowerCase(), price, description, content, images, category });

      await newProduct.save();
      res.json({ msg: "Product is added" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  //update product
  updateProduct: async (req, res) => {
    try {
      const product_id = req.params.id;
      const { title, price, description, content, images, category } = req.body;
      if (!images) return res.status(400).json({ msg: "No images are uploaded" });

      await Products.findByIdAndUpdate(product_id, { $set: { title: title.toLowerCase(), price, description, content, images, category } });
      res.json({ msg: "Product is updated" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  //delete product
  deleteProduct: async (req, res) => {
    try {
      const product_id = req.params.id;

      await Products.findByIdAndDelete(product_id);
      res.json({ msg: "The product is deleted" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
};
module.exports = productCtrl;
