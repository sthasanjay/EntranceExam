const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");

const {
    adminGetAllSubject,
    adminEditSubject
} = require("../adminControllers/adminSubjectController");

//Auth contorllers API endpoints
router.get("/getAllSubject", adminGetAllSubject);
router.put("/editSubject/:id", adminEditSubject);

module.exports = router;
