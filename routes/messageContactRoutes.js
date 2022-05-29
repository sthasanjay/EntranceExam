const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  createMessageContact,
  getMessageContactByUser,
} = require("../controllers/messageContactController");

//Auth contorllers API endpoints
router.post("/create", protect, restrictTo('paidUser'), createMessageContact);
router.get("/getByUser", protect, getMessageContactByUser);

module.exports = router;
