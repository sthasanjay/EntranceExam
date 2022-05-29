const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  generateTestSeriesTemplate,
  getAllSeriesTemplate,
} = require("../controllers/testSeriesTemplateController");

//Auth contorllers API endpoints
router.post("/generateTestSeriesTemplate", generateTestSeriesTemplate);
router.get("/getAll", getAllSeriesTemplate);

module.exports = router;
