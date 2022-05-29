const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  adminCreateQuestionReport,
  adminEditQuestionReport,
  adminGetAllQuestionReport
} = require("../adminControllers/adminQuestionReportController");

//Auth contorllers API endpoints
router.post("/create", protect, restrictTo("admin"), adminCreateQuestionReport);
router.put("/edit/:id", protect, restrictTo("admin"), adminEditQuestionReport);
router.get("/getAll", protect, restrictTo("admin"), adminGetAllQuestionReport);

module.exports = router;
