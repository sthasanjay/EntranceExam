const {
  User,
  Subject,
  Chapter,
  TestSeriesTemplate,
  TestSeriesTemplateQuestion,
  EntranceQuestion,
  UserTestSeriesLog,
  UserTestSeriesQuestion,
} = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

/* 
    @desc Get Test Series Template Question List
    @route GET /api/v1/userTestSeries/generateUserTemplateQuestion/:templateId
    @access private
**/
exports.generateUserTestSeriesQuestion = catchAsync(async (req, res, next) => {
  let result;
  let userTestSeriesTemplateQuestionListArray = [];

  const checkDuplicate = await UserTestSeriesLog.findOne({
    where: {
      userId: req.user.id,
      templateId: req.params.templateId,
    },
  });

  if (checkDuplicate) {
    return next(new AppError("User has already submitted", 400));
  }

  const testSeriesTemplate = await TestSeriesTemplate.findOne({
    where: {
      id: req.params.templateId,
    },
  });

  result = await TestSeriesTemplateQuestion.findAll({
    where: { templateId: req.params.templateId },
    attributes: [
      "templateId",
      "questionId",
      "scopeCategoryId",
      "levelId",
      "subjectId",
      "chapterId",
    ],

    include: [
      {
        model: EntranceQuestion,
        attributes: ["questionId"],
      },
    ],
  });

  if (!result.length) {
    return next(new AppError("Template Question doesnot exists", 400));
  }

  const newUserTestSeriesLog = await UserTestSeriesLog.create({
    userId: req.user.id,
    templateId: req.params.templateId,
    templateType: testSeriesTemplate.templateType,
    scopeCategoryId: testSeriesTemplate.scopeCategoryId,
  });

  if (!newUserTestSeriesLog) {
    return next(new AppError("Cannot Generate UserTestSeriesLog", 400));
  }

  await Promise.all(
    result.map(async (el) => {
      userTestSeriesTemplateQuestionListArray.push({
        testSeriesLogId: newUserTestSeriesLog.id,
        userId: req.user.id,
        templateId: req.params.templateId,
        questionId: el.questionId,
        scopeCategoryId: el.scopeCategoryId,
        chapterId: el.chapterId,
        subjectId: el.subjectId,
      });
    })
  );

  const response = await UserTestSeriesQuestion.bulkCreate(
    userTestSeriesTemplateQuestionListArray,
    {
      include: {
        model: EntranceQuestion,
        attributes: ["questionId"],
      },
    }
  );
  const list = await UserTestSeriesQuestion.findAll({
    where: {
      userId: req.user.id,
      testSeriesLogId: newUserTestSeriesLog.id,
      templateId: req.params.templateId,
    },
    include: [
      {
        model: EntranceQuestion,
        attributes: ["questionId"],
      },
    ],
  });

  //send response
  res.status(200).json({
    status: "success",
    data: {
      testSeriesLogId: newUserTestSeriesLog.id,
      list,
    },
  });
});

/* 
    @desc Put submitUserTestSeries
    @route PUT /api/v1/userTestSeries/submitUserTestSeries/:id
    @access private
**/
exports.submitUserTestSeries = catchAsync(async (req, res, next) => {
  if (
    !req.body.selectedAnswer ||
    !Object.keys(req.body).includes("isCorrect")
  ) {
    return next(new AppError("Input Data Not Complete", 400));
  }

  const checkAttempt = await await UserTestSeriesQuestion.findOne({
    where: { id: req.params.id },
  });

  if (checkAttempt.hasAttemted || checkAttempt.userId !== req.user.id) {
    return next(new AppError("User cannot submit this Question", 400));
  }

  const updatedDoc = await UserTestSeriesQuestion.update(
    {
      hasAttemted: true,
      isCorrect: req.body.isCorrect,
      selectedAnswer: req.body.selectedAnswer,
      duration: req.body.duration,
    },
    {
      returning: true,
      plain: true,
      where: { id: req.params.id },
    }
  );

  if (!updatedDoc[1].dataValues) {
    return next(new AppError("Invalid UserTestSeries Id", 400));
  }

  await UserTestSeriesLog.increment("attemptedCount", {
    by: 1,
    where: { id: updatedDoc[1].dataValues.testSeriesLogId },
  });

  if (req.body.isCorrect === true) {
    await UserTestSeriesLog.increment("correctCount", {
      by: 1,
      where: { id: updatedDoc[1].dataValues.testSeriesLogId },
    });
  } else {
    await UserTestSeriesLog.increment("wrongCount", {
      by: 1,
      where: { id: updatedDoc[1].dataValues.testSeriesLogId },
    });
  }

  //send response
  res.status(200).json({
    status: "success",
    data: {
      updatedDoc,
    },
  });
});

/* 
    @desc GET submitUserTestSeries
    @route GET /api/v1/userTestSeries/testSeriesSummary/:logId
    @access private
**/
exports.userTestSeriesSummary = catchAsync(async (req, res, next) => {
  const userTestSeriesLog = await UserTestSeriesLog.findOne({
    where: { id: req.params.logId },
  });

  if (!userTestSeriesLog) {
    return next(new AppError("Invalid UserTestSeriesLog Id", 400));
  }
  const userTestSeriesQuestion = await UserTestSeriesQuestion.findAll({
    where: { testSeriesLogId: req.params.logId },
    include: [
      {
        model: EntranceQuestion,
        attributes: ["questionId"],
      },
    ],
  });

  //send response
  res.status(200).json({
    status: "success",
    data: {
      userTestSeriesLog,
      userTestSeriesQuestion,
    },
  });
});

/* 
    @desc GET submitUserTestSeries
    @route GET /api/v1/userTestSeries/testSeriesScore/:templateId
    @access private
**/
exports.testSeriesScoreBoard = catchAsync(async (req, res, next) => {
  if (!req.query.page) {
    return next(new AppError("Page parameter is Required", 400));
  }

  let limit = req.query.limit;
  let page = req.query.page * 1 - 1;
  let offset = page * limit || 0;

  const testSeriesTemplate = await TestSeriesTemplate.findOne({
    where: { id: req.params.templateId },
  });
  let totalQuestion = testSeriesTemplate.questionCount;

  const userTestSeriesLog = await UserTestSeriesLog.findAll({
    where: { templateId: req.params.templateId },
    order: [["correctCount", "DESC"]],
    limit,
    offset,
    include: {
      model: User,
      attributes: ["firstName", "lastName", "profileImage"],
    },
  });
  let scoreBoardArray = [];
  let rank = 1;
  Promise.all(
    userTestSeriesLog.map(async (el) => {
      let userScore = {};
      userScore.rank = offset + rank;
      userScore.percenatage = (el.correctCount / totalQuestion) * 100;
      userScore.firstName = el.User.firstName;
      userScore.lastName = el.User.lastName;
      userScore.profileImage = el.User.profileImage;
      scoreBoardArray.push(userScore);

      rank++;
    })
  );

  //send response
  res.status(200).json({
    status: "success",
    data: {
      scoreBoardArray,
    },
  });
});

/* 
    @desc GET submitUserTestSeries
    @route GET /api/v1/userTestSeries/latestScore/:templateType
    @access private
**/
exports.testSeriesScoreBoardByType = catchAsync(async (req, res, next) => {
  if (!req.query.page) {
    return next(new AppError("Page parameter is Required", 400));
  }

  let limit = req.query.limit;
  let page = req.query.page * 1 - 1;
  let offset = page * limit || 0;

  const testSeriesTemplate = await TestSeriesTemplate.findOne({
    where: { templateType: req.params.templateType },
    order: [["createdAt", "DESC"]],
  });

  let totalQuestion = testSeriesTemplate.questionCount;

  const userTestSeriesLog = await UserTestSeriesLog.findAll({
    where: { templateId: testSeriesTemplate.id },
    order: [["correctCount", "DESC"]],
    limit,
    offset,
    include: {
      model: User,
      attributes: ["firstName", "lastName", "profileImage"],
    },
  });
  let scoreBoardArray = [];
  let rank = 1;
  Promise.all(
    userTestSeriesLog.map(async (el) => {
      let userScore = {};
      userScore.rank = offset + rank;
      userScore.percenatage = (el.correctCount / totalQuestion) * 100;
      userScore.firstName = el.User.firstName;
      userScore.lastName = el.User.lastName;
      userScore.profileImage = el.User.profileImage;
      scoreBoardArray.push(userScore);

      rank++;
    })
  );

  //send response
  res.status(200).json({
    status: "success",
    data: {
      scoreBoardArray,
    },
  });
});
