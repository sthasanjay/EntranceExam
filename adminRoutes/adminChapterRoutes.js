const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
  adminGetAllParentChapter,
  adminChapterByParent,
  adminEditChapter,
  adminGetAllChapter,
} = require("../adminControllers/adminChapterController");

//Auth contorllers API endpoints
router.get("/getAllParentChapter", adminGetAllParentChapter);
router.get("/getChapterByParentId/:parentId", adminChapterByParent);
router.put("/editChapter/:id", adminEditChapter);
router.get("/getAllChapter", adminGetAllChapter);

module.exports = router;
