const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  verifyBankPayment,
} = require("../adminControllers/adminBankPaymentController");

//Auth contorllers API endpoints
router.put("/verify/:id", protect, restrictTo("admin"), verifyBankPayment);

module.exports = router;
