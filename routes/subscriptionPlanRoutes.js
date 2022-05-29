const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const { getAllSubscriptionPlan } = require("../controllers/subscriptionPlanController");

//Auth contorllers API endpoints
router.get("/getAll", getAllSubscriptionPlan);

module.exports = router;
