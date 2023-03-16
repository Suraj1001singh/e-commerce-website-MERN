const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");
const AuthAdmin = require("../middleware/authAdmin");
const Authentication = require("../middleware/authentication");

router.get("/product", productCtrl.getProducts);

router.get("/product/:id", productCtrl.getProduct);

router.post("/product", Authentication, AuthAdmin, productCtrl.addProduct);

router.put("/product/:id", Authentication, AuthAdmin, productCtrl.updateProduct);

router.delete("/product/:id", Authentication, AuthAdmin, productCtrl.deleteProduct);

module.exports = router;
