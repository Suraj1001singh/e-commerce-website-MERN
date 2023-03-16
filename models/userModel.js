const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema =new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
//-----------------------Generating authToken------------
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
    return token;
  } catch (e) {
    res.status(400).json({ msg: "problem in generating token" });
  }
};
//--------------------------------------------------------

//-----------------------Password Hashing-----------------
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
//--------------------------------------------------------

const Users = mongoose.model("USER", userSchema);
module.exports = Users;
