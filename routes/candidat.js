const express = require("express");
const router = express.Router();
const candController = require("../controllers/candController");
const candUser = require("../controllers/userController");

router.post("/signup", candController.signup);
router.post("/login", candController.login);
router.post("/logout", candController.logout);
router.post("/forgot", candUser.forget);
router.post("/reset", candUser.reset);

router.put("/update/:id", candController.updateCand);

router.get("/verifier/:mail", candController.verifCand);
router.get("/candidats", candController.getAll);
router.get("/", candController.getCand);
router.get("/laste_user", candUser.getLast);

module.exports = router;
