const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const Payments = require("../models/paymentModel");
const bcrypt = require("bcrypt");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      //checking user is database
      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: "The email is already exists." });
      if (password.length < 2) return res.status(400).json({ msg: "Password is atleast 2 character long" });

      //creating user new instance and saving
      const newUser = new Users({ name, email, password });
      const savedUser = await newUser.save();

      //Creating jwt token
      // const accesstoken = createAccessToken({ id: newUser._id });
      // const refreshtoken = createRefreshToken({ id: newUser._id });
      // res.cookie("refreshtoken", refreshtoken, {
      //   httpOnly: true,
      //   path: "/user/refresh_token",
      // });

      res.json({ msg: "Registeration successful" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid Credentials" });
      //if user exist then check password

      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) return res.status(400).json({ msg: "Invalid Credentials" });

      //if login is successful, then create access token and refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      //storing refreshtoken in cookies
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ msg: "Login successful", accesstoken });
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" });
      await jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please Login or Register" });
        const accesstoken = createAccessToken({ id: user.id });
        res.json({ accesstoken });
      });
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  },

  getuser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");

      if (!user) return res.status(400).json({ msg: "user doesn't exist" });
      res.json(user);
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  addCart: async (req, res) => {
    try {
      const user = await Users.findByIdAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );
      return res.json({ msg: "Added to cart" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  updateCart: async (req, res) => {
    try {
      await Users.findByIdAndUpdate({ _id: req.user.id }, { cart: req.body.cart });
      res.json({ msg: "cart is updated" });
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  },

  getOrderHistory: async (req, res) => {
    try {
      const orderHistory = await Payments.find({ user_id: req.user.id });
      if (!orderHistory) return res.status(400).json({ msg: "No orders yet!" });
      res.json(orderHistory);
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "17s" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};
module.exports = userCtrl;
