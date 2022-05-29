const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  adminGetAllCourse,
  adminEditCourse,
  adminGetCourseById,
  adminCreateCourse,
} = require("../adminControllers/adminCourseController");

//Auth contorllers API endpoints
router.get("/getAllCourse", adminGetAllCourse);
router.get("/getOne/:id", adminGetCourseById);

router.put("/editCourse/:id", adminEditCourse);
router.post("/createCourse", adminCreateCourse);
module.exports = router;
