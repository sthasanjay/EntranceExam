const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  createQuestionLevel,
  createCourse,
  createSubject,
  createEntranceQuestion,
  createChapter
} = require("../controllers/saveDataController");

//Auth contorllers API endpoints
router.get("/createQuestionLevel", createQuestionLevel);
router.get("/createCourse", createCourse);
router.get("/createSubject", createSubject);
router.get("/createEntranceQuestion", createEntranceQuestion);

router.get("/createChapter", createChapter);

module.exports = router;
