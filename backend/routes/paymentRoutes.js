const router = require("express").Router();

const Authenticaton = require("../middleware/authentication");
const AuthAdmin = require("../middleware/authAdmin");
const paymentCtrl = require("../controllers/paymentCtrl");

router.get("/payment", Authenticaton, AuthAdmin, paymentCtrl.getPayments);
router.post("/payment", Authenticaton, paymentCtrl.createPayment);

module.exports = router;
