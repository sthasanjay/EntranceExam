const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  createSubscriptionPlan,
  editSubscriptionPlan,
  adminGetAllSubscriptionPlan,
  getOneSubscriptionPlan
} = require("../adminControllers/adminSubscriptionPlanController");

//Auth contorllers API endpoints
router.post("/create", createSubscriptionPlan);
router.put("/edit/:id", editSubscriptionPlan);
router.get("/getAll", adminGetAllSubscriptionPlan);
router.get("/getOne/:id", getOneSubscriptionPlan);

module.exports = router;
