const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  generateUserTestSeriesQuestion,
  submitUserTestSeries,
  userTestSeriesSummary,
  testSeriesScoreBoard,
  testSeriesScoreBoardByType,
} = require("../controllers/userTestSeriesController");

//Auth contorllers API endpoints
router.get(
  "/generateUserTemplateQuestion/:templateId",
  protect,
  generateUserTestSeriesQuestion
);

router.put("/submitUserTestSeries/:id", protect, submitUserTestSeries);

router.get("/testSeriesSummary/:logId", protect, userTestSeriesSummary);

router.get("/testSeriesScore/:templateId", protect, testSeriesScoreBoard);

router.get("/latestScore/:templateType", protect, testSeriesScoreBoardByType);

module.exports = router;
