const router = require("express").Router();

const {
  protect,
  restrictTo,
  adminProtect,
} = require("../controllers/authController");

const {
  adminGetAllUser,
  checkOwnUser,
} = require("../adminControllers/adminUserController");

//Auth contorllers API endpoints
router.get("/getAll", adminProtect, restrictTo("admin"), adminGetAllUser);
router.get("/checkOwnProfile", adminProtect, restrictTo("admin"), checkOwnUser);

module.exports = router;
