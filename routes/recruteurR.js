const express = require("express");
const router = express.Router();
const recruController = require("../controllers/recruController");

router.post("/signup/recruteur", recruController.signup);
router.post("/login", recruController.login);
router.post("/logout", recruController.logout);

router.put("/update/:id", recruController.updateRec);

router.get("/RecInfo/:id", recruController.getRecInfo);
router.get("/recruteurs", recruController.getAll);

module.exports = router;
