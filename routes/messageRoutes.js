const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  createMessage,
  getAllMessageByRoom,
  getOneMessage,
} = require("../controllers/messageController");

//Auth contorllers API endpoints
router.post("/create/:roomId", protect, createMessage);
router.get("/getByRoom/:roomId", protect, getAllMessageByRoom);
router.get("/getOne/:id", protect, getOneMessage);

module.exports = router;
