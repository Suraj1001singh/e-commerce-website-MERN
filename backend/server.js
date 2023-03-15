require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

//-------------------------Middlewares--------------
app.use((req, res, next) => {
  if (req.originalUrl === "/api/webhook") {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//-----------------------------------------------

//--------------------------Routes---------------

app.use("/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/productRoutes"));
app.use("/api", require("./routes/paymentRoutes"));
//----------------------------------------------

//---------------------- connecting to mongodb--------
const URI = process.env.DB_URI;
mongoose
  .connect(URI, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((e) => console.log("not connected", e));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("server running  at port", PORT);
});
//----------------------------------------------------
