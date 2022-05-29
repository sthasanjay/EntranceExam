const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  adminCreateBankAccount,
  adminEditBankAccount,
  getAllBankAccount,
  adminGetOneBankAccount
} = require("../adminControllers/adminBankAccountController");

//Auth contorllers API endpoints
router.post("/create", protect, restrictTo("admin"), adminCreateBankAccount);
router.put("/edit/:id", protect, restrictTo("admin"), adminEditBankAccount);
router.get("/getAll", protect, restrictTo("admin"), getAllBankAccount);
router.get("/getOne/:id", protect, restrictTo("admin"), adminGetOneBankAccount);

module.exports = router;
