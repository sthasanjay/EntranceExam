const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
    adminGetOneDiscussionReply,
    admingGetAllDiscussionReply,
} = require("../adminControllers/adminDiscussionReplyController");

//Auth contorllers API endpoints
router.get("/getOne/:id", adminGetOneDiscussionReply);
router.get("/getAll", admingGetAllDiscussionReply);

module.exports = router;
