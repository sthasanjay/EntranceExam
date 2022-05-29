const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  getAllTestSeriesTemplateQuestion,
} = require("../controllers/testSeriesTemplateQuestionController");

//Auth contorllers API endpoints
router.get(
  "/getAllTestSeriesTemplateQuestion/:templateId",
  protect,
  getAllTestSeriesTemplateQuestion
);

module.exports = router;
