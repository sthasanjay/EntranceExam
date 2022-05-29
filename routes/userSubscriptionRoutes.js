const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  updateUserSubscription,
} = require("../controllers/userSubscriptionController");

//Auth contorllers API endpoints
router.post("/checkSubscription", protect, updateUserSubscription);

module.exports = router;
