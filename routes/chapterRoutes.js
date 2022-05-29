const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const { getAllChapter } = require("../controllers/chapterController");

//Auth contorllers API endpoints
router.get("/getAllChapter", getAllChapter);

module.exports = router;
