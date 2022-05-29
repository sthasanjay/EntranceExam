const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  generateStartTest,
  submitQuestion,
  setSubmitQuestion,
  performanceSummary,
} = require("../controllers/startTestController");

//Auth contorllers API endpoints
router.post("/generate", protect, generateStartTest);
router.post("/submitQuestion/:questionId", protect, submitQuestion);

router.patch("/submitStartTest/:startTestLogId", protect, setSubmitQuestion);

router.get("/performanceSummary/:startTestLogId", protect, performanceSummary);

module.exports = router;
