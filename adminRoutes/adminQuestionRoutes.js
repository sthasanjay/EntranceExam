const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  adminGetAllEntranceQuestion,
  adminEditEntranceQuestion,
  getOneEntranceQuestion,
  adminCreateEntranceQuestion,
} = require("../adminControllers/adminQuestionController");

//Auth contorllers API endpoints
router.get("/getAllQuestion", adminGetAllEntranceQuestion);
router.put(
  "/editQuestion/:id",
  protect,
  restrictTo("admin"),
  adminEditEntranceQuestion
);

router.get("/getOneEntranceQuestion/:id", getOneEntranceQuestion);
router.post(
  "/create",
  protect,
  restrictTo("admin"),
  adminCreateEntranceQuestion
);

module.exports = router;
