const express = require("express");
const router = express.Router();
const recruController = require("../controllers/recruController");

router.post("/signup/recruteur", recruController.signup);
router.post("/add_recruteur", recruController.add);
router.post("/login", recruController.login);
router.post("/logout", recruController.logout);

router.put("/update/:id", recruController.updateRec);
router.put("/update_verifier/:id", recruController.updateVerif);

router.get("/RecInfo/:id", recruController.getRecInfo);
router.get("/recruteurs", recruController.getAll);

router.delete("/delete_recruteur/:id", recruController.deleteRecu);

module.exports = router;
