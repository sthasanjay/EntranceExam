const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  adminCreateExpertProfile,
  adminEditExpertProfile,
  adminGetAllExpertProfile,
  adminGetOneExpertProfile,
} = require("../adminControllers/adminExpertProfileController");

//Auth contorllers API endpoints
router.post("/create", protect, restrictTo("admin"), adminCreateExpertProfile);
router.put("/edit/:id", protect, restrictTo("admin"), adminEditExpertProfile);
router.get("/getAll", protect, restrictTo("admin"), adminGetAllExpertProfile);
router.get(
  "/getOne/:id",
  protect,
  restrictTo("admin"),
  adminGetOneExpertProfile
);

module.exports = router;
