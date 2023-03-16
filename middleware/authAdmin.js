const Users = require("../models/userModel");

const authAdmin = async (req, res,next) => {
  try {
    //get user information
    const user = await Users.findOne({ _id: req.user.id });
    if (user.role === 0) return res.status(400).json({ msg: "Access denied as Admin" });
    next();
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

module.exports = authAdmin;
