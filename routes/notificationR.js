const express = require("express");
const router = express.Router();
const notif = require("../controllers/notificationController");

router.post("/add", notif.add);

router.get("/getNotif/:id", notif.getNotif);

router.put("/markAllAsRead/:id", notif.markAllAsRead);

module.exports = router;
