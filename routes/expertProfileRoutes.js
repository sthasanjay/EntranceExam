const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  createExpertProfile,
  editExpertProfile,
  getOneExpertProfile,
  getAllExpertProfile,
} = require("../controllers/expertProfileController");

//Auth contorllers API endpoints
router.post("/create", protect, restrictTo("admin"), createExpertProfile);
router.put("/edit/:id", editExpertProfile);
router.get("/getOne/:id", getOneExpertProfile);
router.get("/getAll", getAllExpertProfile);

module.exports = router;
