const router = require("express").Router();
const categoryCtrl = require("../controllers/categoryCtrl");
const Authenticaton = require("../middleware/authentication");
const AuthAdmin = require("../middleware/authAdmin");

// get all category
router.get("/category", categoryCtrl.getCategories);

//create category --only admin allowed
router.post("/category", Authenticaton, AuthAdmin, categoryCtrl.createCategory);

//update category --only admin allowed
router.put("/category/:id", Authenticaton, AuthAdmin, categoryCtrl.updateCategory);

//delete category --only admin allowed
router.delete("/category/:id", Authenticaton, AuthAdmin, categoryCtrl.deleteCategory);

module.exports = router;
