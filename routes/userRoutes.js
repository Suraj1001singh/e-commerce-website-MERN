const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const authentication = require("../middleware/authentication");

router.post("/register", userCtrl.register);

router.post("/login", userCtrl.login);

router.get("/logout", userCtrl.logout);

router.get("/refresh_token", userCtrl.refreshToken);

router.get("/info", authentication, userCtrl.getuser);

router.patch("/addcart", authentication, userCtrl.addCart);

router.patch("/updatecart", authentication, userCtrl.updateCart);

router.get("/orderhistory", authentication, userCtrl.getOrderHistory);

module.exports = router;
