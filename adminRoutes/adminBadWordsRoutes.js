const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  adminCreateBadWord,
  editCreateBankAccount,
  adminGetallBadWord,
} = require("../adminControllers/adminBadWordsController");

//Auth contorllers API endpoints
router.post("/create", protect, restrictTo("admin"), adminCreateBadWord);
router.put("/edit/:id", protect, restrictTo("admin"), editCreateBankAccount);
router.get("/getAll", protect, restrictTo("admin"), adminGetallBadWord);

module.exports = router;
