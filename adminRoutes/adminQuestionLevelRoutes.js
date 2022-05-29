const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
    adminGetAllQuestionLevel,
    adminEditQuestionLevel
} = require("../adminControllers/adminQuestionLevelController");

//Auth contorllers API endpoints
router.get("/getAllLevel", adminGetAllQuestionLevel);
router.put("/editQuestionLevel/:id", adminEditQuestionLevel);

module.exports = router;
