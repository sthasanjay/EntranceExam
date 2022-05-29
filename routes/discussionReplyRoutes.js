const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  createDiscussionReply,
  editDiscussionReply,
  getOneDiscussionReply,
  getAllDiscussionReply,
  createSecondDiscussionReply,
} = require("../controllers/discussionReplyContoller");

//Auth contorllers API endpoints
router.post("/create/:discussionId", protect, createDiscussionReply);
router.put("/edit/:id", editDiscussionReply);
router.get("/getOne/:id", getOneDiscussionReply);
router.get("/getAll", getAllDiscussionReply);

router.post(
  "/createSecondDiscussionReply/:discussionReplyId",
  protect,
  createSecondDiscussionReply
);

module.exports = router;
