const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  createQuestionReport,
  editQuestionReport,
  getOneQuestionReport,
  getAllQuestionReport,
  submitQuestionReport
} = require("../controllers/questionReportController");

//Auth contorllers API endpoints
router.post("/create", protect, createQuestionReport);
router.put("/edit/:id", protect, editQuestionReport);
router.get("/getOne/:id", protect, getOneQuestionReport);
router.get("/getAll", protect, getAllQuestionReport);
router.post("/submit/:questionId", protect, submitQuestionReport);

module.exports = router;
