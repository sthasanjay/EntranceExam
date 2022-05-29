const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const { createBankPayment } = require("../controllers/bankPaymentController");

//Auth contorllers API endpoints

router.post("/create", protect, createBankPayment);

module.exports = router;
