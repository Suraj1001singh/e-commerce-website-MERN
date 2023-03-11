const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      //if user.role===1--->admin
      //only admin can create, delete and update category
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category) return res.status(400).json({ msg: "This category already exist" });
      const newCategory = new Category({ name });
      await newCategory.save();

      res.json({ msg: "Category created successfully" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findByIdAndUpdate(req.params.id, { $set: { name } });
      res.json({ msg: "A Category is updated" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const products = await Product.findOne({ category: req.params.id });
      if (products) return res.status(400).json({ msg: "Please delete all products of selected category first" });
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "A Category is deleted" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
};
module.exports = categoryCtrl;
