const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const { submitPayment } = require("../controllers/smartGateWayController");

//Auth contorllers API endpoints
router.post("/submit", protect, submitPayment);
module.exports = router;
