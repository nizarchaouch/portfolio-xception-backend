const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const user = require("../controllers/userController");

router.post("/add", adminController.addAdmin);
router.post("/login", adminController.login);
router.post("/logout", adminController.logout);
router.post("/forgot", user.forget);
router.post("/reset", user.reset);

router.put("/update/:id", adminController.updateAdmin);

router.get("/getAll", adminController.getAll);
router.get("/", adminController.getCand);

module.exports = router;
