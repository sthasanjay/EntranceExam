const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const sequelize = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");
const {
  EntranceQuestion,
  TestSeriesTemplate,
  TestSeriesTemplateQuestion,
} = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { v4 } = require("uuid");
const { Op } = require("sequelize");

/* 
    @desc generate Test Series Template 
    @route POST /api/v1/testSeriesTemplate/generate
    @access private
**/
exports.generateTestSeriesTemplate = catchAsync(async (req, res, next) => {
  let result;
  let questionArray = req.body.questions;
  let testSeriesTemplateQuestionArray = [];
  let testCompleted = false;
  const testSeriesTemplate = await TestSeriesTemplate.create({
    seriesName: req.body.seriesName,
    questionCount: req.body.questions.length,
    activationDate: req.body.activationDate,
    endDate: req.body.endDate,
    scopeCategoryId: req.body.scopeCategoryId,
    templateType: req.body.templateType,
    duration: req.body.duration,
  });

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
        scopeCategoryId: result.courseId,
      });
    })
  );

  await TestSeriesTemplateQuestion.bulkCreate(testSeriesTemplateQuestionArray);

  //send response
  res.status(200).json({
    status: "success",
    templateId: testSeriesTemplate.id,
    testCompleted,
    count: req.body.questions.length,
    data: {
      testSeriesTemplateQuestionArray,
    },
  });
});

/* 
    @desc Get Discussion list
    @route GET /api/v1/testSeriesTemplate/getAll
    @access private
**/
exports.getAllSeriesTemplate = catchAsync(async (req, res, next) => {
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
