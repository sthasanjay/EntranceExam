const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  getAllTestSeriesTemplate,
  generateTestSeriesTemplate,
  editTestSeriesTemplate,
  removeQuestion,
  addQuestion,
  getQuestionForTestSeries,
  getQuestionById,
  getOneTestSeriesTemplate,
} = require("../adminControllers/adminTestSeriesController");

//Auth contorllers API endpoints
router.get(
  "/getOne/:id",
  protect,
  restrictTo("admin"),
  getOneTestSeriesTemplate
);

router.get("/getAll", protect, restrictTo("admin"), getAllTestSeriesTemplate);

router.post(
  "/generate",
  protect,
  restrictTo("admin"),
  generateTestSeriesTemplate
);
router.put("/edit/:id", protect, restrictTo("admin"), editTestSeriesTemplate);
router.put("/removeQuestion/:id", protect, restrictTo("admin"), removeQuestion);
router.put("/addQuestion/:id", protect, restrictTo("admin"), addQuestion);
router.get(
  "/getQuestion/:testSeriesId",
  protect,
  restrictTo("admin"),
  getQuestionForTestSeries
);
router.get(
  "/getQuestionById/:id",
  protect,
  restrictTo("admin"),
  getQuestionById
);

module.exports = router;
