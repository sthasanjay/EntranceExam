const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const { getAllCourse } = require("../controllers/courseController");

//Auth contorllers API endpoints
router.get("/getAllCourse", getAllCourse);

module.exports = router;
