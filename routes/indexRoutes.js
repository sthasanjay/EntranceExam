const router = require("express").Router();
const userRouter = require("./userRoutes");

const discussionRouter = require("./discussionRoutes");
const discussionReplyRouter = require("./discussionReplyRoutes");
const expertProfileRouter = require("./expertProfileRoutes");
const messageContactRouter = require("./messageContactRoutes");
const messageRouter = require("./messageRoutes");
const subjectRouter = require("./subjectRoutes");

const savaDataRouter = require("./savaDataRoutes");
const QuestionLevelRouter = require("./questionlevelRoutes");
const SubjectRouter = require("./subjectRoutes");
const CourseRouter = require("./courseRoutes");
const ChapterRouter = require("./chapterRoutes");
const EntranceExamRouter = require("./entranceQuestionRoutes");
const startTestRouter = require("./startTestRoutes");
const testSeriesTemplateRouter = require("./testSeriesTemplateRoutes");
const testSeriesTemplateQuestionRouter = require("./testSeriesTemplateQuestionRoutes");

const userTestSeriesRouter = require("./userTestSeriesRoutes");
const questionReportRouter = require("./questionReportRoutes");
const userSubscriptionRouter = require("./userSubscriptionRoutes");
const subscriptionPlanRouter = require("./subscriptionPlanRoutes");
const bankAccountRouter = require("./bankAccountRoutes");
const bankPaymentRouter = require("./bankPaymentRoutes");
const paymentRouter = require("./paymentRoutes");

router.use("/api/v1/users", userRouter);
router.use("/api/v1/discussion", discussionRouter);
router.use("/api/v1/discussionReply", discussionReplyRouter);
router.use("/api/v1/expertProfile", expertProfileRouter);
router.use("/api/v1/messageContact", messageContactRouter);
router.use("/api/v1/message", messageRouter);
router.use("/api/v1/subject", subjectRouter);

router.use("/api/v1/saveData", savaDataRouter);
router.use("/api/v1/questionLevel", QuestionLevelRouter);
router.use("/api/v1/subject", SubjectRouter);
router.use("/api/v1/course", CourseRouter);
router.use("/api/v1/chapter", ChapterRouter);
router.use("/api/v1/entrancequestion", EntranceExamRouter);
router.use("/api/v1/startTest", startTestRouter);

router.use("/api/v1/testSeriesTemplate", testSeriesTemplateRouter);
router.use(
  "/api/v1/testSeriesTemplateQuestion",
  testSeriesTemplateQuestionRouter
);
router.use("/api/v1/userTestSeries", userTestSeriesRouter);
router.use("/api/v1/questionReport", questionReportRouter);
router.use("/api/v1/userSubscription", userSubscriptionRouter);
router.use("/api/v1/subscriptionPlan", subscriptionPlanRouter);
router.use("/api/v1/bankAccount", bankAccountRouter);
router.use("/api/v1/bankPayment", bankPaymentRouter);
router.use("/api/v1/payment", paymentRouter);

module.exports = router;
