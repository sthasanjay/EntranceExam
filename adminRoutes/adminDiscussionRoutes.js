const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  adminGetOneDiscussion,
  adminGetAllDiscussion,
} = require("../adminControllers/adminDiscussionController");

//Auth contorllers API endpoints
router.get("/getOne/:id", adminGetOneDiscussion);
router.get("/getAll", adminGetAllDiscussion);

module.exports = router;
