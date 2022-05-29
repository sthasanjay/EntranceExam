const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const { getAllSubject } = require("../controllers/subjectController");

//Auth contorllers API endpoints
router.get("/getAllSubject", getAllSubject);

module.exports = router;
