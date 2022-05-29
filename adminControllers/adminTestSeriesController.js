const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const sequelize = require("sequelize");
const {
  EntranceQuestion,
  TestSeriesTemplate,
  TestSeriesTemplateQuestion,
  Course,
  Subject,
  Chapter,
} = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { v4 } = require("uuid");
const { Op } = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");

/* 
    @desc Get one Discussion
    @route GET /api/v1/admin/testSeriesTemplate/getOne/:id
    @access private
**/
exports.getOneTestSeriesTemplate = catchAsync(async (req, res, next) => {
  const testSeriesTemplate = await TestSeriesTemplate.findOne({
    where: {
      id: req.params.id,
    },
  });
  // check whether the Discussion exist or not
  if (!testSeriesTemplate)
    return next(new AppError("TestSeriesTemplate not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      testSeriesTemplate,
    },
  });
});

/* 
    @desc GET all Test Series Template 
    @route GET /api/v1/admin/testSeriesTemplate/getAll
    @access private
**/
exports.getAllTestSeriesTemplate = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);
  let result = await TestSeriesTemplate.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });

  let total = await TestSeriesTemplate.count({
    where: { ...feature.queryObj },
  });
  const pageInfo = await paginationInfo(
    total,
    parseInt(req.query.page),
    parseInt(req.query.limit)
  );
  //send response
  res.status(200).json({
    status: "success",
    data: {
      totalCount: total,
      pagination: pageInfo,
      result,
    },
  });
});

/* 
    @desc generate Test Series Template 
    @route POST /api/v1/admin/testSeriesTemplate/generate
    @access private
**/
exports.generateTestSeriesTemplate = catchAsync(async (req, res, next) => {
  let result;
  let questionArray = req.body.questions;
  let testSeriesTemplateQuestionArray = [];
  const testSeriesTemplate = await TestSeriesTemplate.create({
    seriesName: req.body.seriesName,
    questionCount: req.body.question ? req.body.question.length : 0,
    activationDate: req.body.activationDate,
    endDate: req.body.endDate,
    templateType: req.body.templateType,
    scopeCategoryId: req.body.scopeCategoryId,
    isUpcomingTest: req.body.isUpcomingTest,
  });

  if (questionArray) {
    await Promise.all(
      questionArray.map(async (el) => {
        result = await EntranceQuestion.findOne({
          where: {
            questionId: el,
          },
        });
        testSeriesTemplateQuestionArray.push({
          templateId: testSeriesTemplate.id,
          questionId: result.questionId,
          levelId: result.levelId,
          subjectId: result.subjectId,
          chapterId: result.chapterId,
          scopeCategoryId: req.body.scopeCategoryId,
        });
      })
    );

    await TestSeriesTemplateQuestion.bulkCreate(
      testSeriesTemplateQuestionArray
    );
  }
  //send response
  res.status(200).json({
    status: "success",
    templateId: testSeriesTemplate.id,
    count: req.body.questions ? req.body.question.length : 0,
    data: {
      testSeriesTemplateQuestionArray,
    },
  });
});

/* 
    @desc edit Test Series Template 
    @route PUT /api/v1/admin/testSeriesTemplate/edit/:id
    @access private
**/
exports.editTestSeriesTemplate = catchAsync(async (req, res, next) => {
  let updatedDoc = await TestSeriesTemplate.update(req.body, {
    returning: true,
    where: { id: req.params.id },
  });
  //send response
  res.status(200).json({
    status: "success",
    data: {
      updatedDoc,
    },
  });
});

/* 
    @desc edit Test Series Template 
    @route PUT /api/v1/admin/testSeriesTemplate/removeQuestion/:id
    @access private
**/
exports.removeQuestion = catchAsync(async (req, res, next) => {
  if (!req.body.questionId) {
    return next(new AppError("questionId is Required", 500));
  }

  let checkQuestion = await TestSeriesTemplateQuestion.destroy({
    where: {
      templateId: req.params.id,
      questionId: req.body.questionId,
    },
  });
  console.log("froomasdasdas", checkQuestion);
  if (!checkQuestion) {
    return next(new AppError("Cannot find Question", 500));
  }

  await TestSeriesTemplate.decrement("questionCount", {
    by: 1,
    where: { id: req.params.id },
  });

  //send response
  res.status(200).json({
    status: "success",
    data: {
      deleteRows: checkQuestion,
    },
  });
});

/* 
    @desc edit Test Series Template 
    @route PUT /api/v1/admin/testSeriesTemplate/addQuestion/:id
    @access private
**/
exports.addQuestion = catchAsync(async (req, res, next) => {
  if (!req.body.questionId) {
    return next(new AppError("questionId is Required", 500));
  }

  let question = await EntranceQuestion.findOne({
    where: { questionId: req.body.questionId },
  });
  if (!question) {
    return next(new AppError("Question Doesnot Exists", 500));
  }
  const getSeriesTemplate = await TestSeriesTemplate.findOne({
    where: { id: req.params.id },
  });
  if (!getSeriesTemplate) {
    return next(new AppError("Series Template Doesnot Exists", 500));
  }

  const seriesTemplate = await TestSeriesTemplate.increment("questionCount", {
    by: 1,
    where: { id: req.params.id },
  });

  let addedQuestion = await TestSeriesTemplateQuestion.create({
    templateId: req.params.id,
    questionId: req.body.questionId,
    levelId: question.levelId,
    subjectId: question.subjectId,
    chapterId: question.chapterId,
    scopeCategoryId: getSeriesTemplate.scopeCategoryId,
  });

  //send response
  res.status(200).json({
    status: "success",
    data: {
      addedQuestion,
    },
  });
});

/* 
    @desc get Question For TestSeries Template 
    @route PUT /api/v1/admin/testSeriesTemplate/getQuestion/:testSeriesId
    @access private
**/
exports.getQuestionForTestSeries = catchAsync(async (req, res, next) => {
  let testSeriesTemplate = await TestSeriesTemplate.findOne({
    where: { id: req.params.testSeriesId },
  });
  if (!testSeriesTemplate) {
    return next(new AppError("TestSeries Doesnot Exists", 500));
  }

  let testSeriesQuestions = await TestSeriesTemplateQuestion.findAll({
    where: { templateId: req.params.testSeriesId },
    raw: true,
  });
  console.log("from here", testSeriesQuestions);

  let questionIdArray = testSeriesQuestions.map(({ questionId }) => questionId);

  console.log("from here23", questionIdArray);

  let feature = apiFeature(req.query);

  let result = await EntranceQuestion.findAll({
    where: {
      ...feature.queryObj,
      id: { [Op.notIn]: questionIdArray },
    },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
    include: [
      {
        model: Subject,
        attributes: ["subjectName"],
      },
      {
        model: Course,
        attributes: ["courseName"],
      },
    ],
  });

  let total = await EntranceQuestion.count({
    where: { ...feature.queryObj, id: { [Op.notIn]: questionIdArray } },
  });
  const pageInfo = await paginationInfo(
    total,
    parseInt(req.query.page),
    parseInt(req.query.limit)
  );

  //send response
  res.status(200).json({
    status: "success",
    data: {
      totalCount: total,
      pagination: pageInfo,
      result,
    },
  });
});

/* 
    @desc get Question by TestSeries Id
    @route PUT /api/v1/admin/testSeriesTemplate/getQuestionById/:id
    @access private
**/
exports.getQuestionById = catchAsync(async (req, res, next) => {
  let result = await TestSeriesTemplateQuestion.findAll({
    where: { templateId: req.params.id },
    include: [
      {
        model: EntranceQuestion,
        include: [
          {
            model: Subject,
            attributes: ["subjectName"],
          },
          {
            model: Course,
            attributes: ["courseName"],
          },
        ],
      },
    ],
  });

  //send response
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});
