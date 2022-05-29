const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const { getAllQuestion } = require("../controllers/questionLevelController");

//Auth contorllers API endpoints
router.get("/getAll", getAllQuestion);

module.exports = router;
