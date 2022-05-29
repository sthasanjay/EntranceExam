const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  getAllEntranceQuestion,
} = require("../controllers/entranceQuestionController");

//Auth contorllers API endpoints
router.get("/getAllEntranceQuestion", getAllEntranceQuestion);

module.exports = router;
