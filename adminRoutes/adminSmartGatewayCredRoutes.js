const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  adminCreateSmartGatewayCred,
} = require("../adminControllers/adminSmartGatewayCredentialController");

//Auth contorllers API endpoints
router.post(
  "/create",
  protect,
  restrictTo("admin"),
  adminCreateSmartGatewayCred
);

module.exports = router;
