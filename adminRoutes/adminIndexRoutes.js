const router = require("express").Router();
const adminUserRouter = require("./adminUserRoutes");

const adminChapterRouter = require("./adminChapterRoutes");
const adminSubjectRouter = require("./adminSubjectRoutes");
const adminQuestionLevelRouter = require("./adminQuestionLevelRoutes");
const adminCourseRouter = require("./adminCourseRoutes");
const adminQuestionRouter = require("./adminQuestionRoutes");
const adminExpertProfileRouter = require("./adminExpertProfileRoutes");
const adminQuestionReportRouter = require("./adminQuestionReportRoutes");
const adminTestSeriesRouter = require("./adminTestSeriesRoutes");
const adminDiscussionRouter = require("./adminDiscussionRoutes");
const adminDiscussionReplyRouter = require("./adminDiscussionReplyRoutes");
const adminSubscriptionPlanRouter = require("./adminSubscriptionPlanRoutes");
const adminBankAccountRouter = require("./adminBankAccountRoutes");
const adminBankPaymentRouter = require("./adminBankPaymentRoutes");
const adminBadWordsRouter = require("./adminBadWordsRoutes");
const adminSmartGatewayCredRouter = require("./adminSmartGatewayCredRoutes");

router.use("/user", adminUserRouter);
router.use("/chapter", adminChapterRouter);
router.use("/subject", adminSubjectRouter);
router.use("/level", adminQuestionLevelRouter);
router.use("/course", adminCourseRouter);
router.use("/question", adminQuestionRouter);
router.use("/expertProfile", adminExpertProfileRouter);
router.use("/questionReport", adminQuestionReportRouter);
router.use("/testSeriesTemplate", adminTestSeriesRouter);
router.use("/discussion", adminDiscussionRouter);
router.use("/discussionReply", adminDiscussionReplyRouter);
router.use("/subscriptionPlan", adminSubscriptionPlanRouter);
router.use("/bankAccount", adminBankAccountRouter);
router.use("/bankPayment", adminBankPaymentRouter);
router.use("/badWord", adminBadWordsRouter);
router.use("/gateway", adminSmartGatewayCredRouter);

module.exports = router;
