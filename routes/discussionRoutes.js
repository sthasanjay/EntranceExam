const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  createDiscussion,
  editDiscussion,
  getOneDiscussion,
  getAllDiscussion,
} = require("../controllers/discussionController");

//Auth contorllers API endpoints
router.post("/create", protect, createDiscussion);
router.put("/edit/:id", editDiscussion);
router.get("/getOne/:id", getOneDiscussion);
router.get("/getAll", getAllDiscussion);

module.exports = router;
