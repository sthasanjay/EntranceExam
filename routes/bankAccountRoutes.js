const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const { getAllBankAccount } = require("../controllers/bankAccountController");

//Auth contorllers API endpoints

router.get("/getAll", getAllBankAccount);

module.exports = router;
