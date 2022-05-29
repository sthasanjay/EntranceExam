const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const {
  QuestionReport,
  StartTestQuestion,
  UserTestSeriesQuestion,
  User,
} = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { v4 } = require("uuid");
const { Op } = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");
/* 
    @desc Create QuestionReport
    @route POST /api/v1/questionReport/create
    @access private
**/
exports.createQuestionReport = catchAsync(async (req, res, next) => {
  if (!req.body.reportTitle) {
    return next(new AppError("reportTitle is Required", 500));
  }
  let questionReport = await QuestionReport.create(req.body);

  // send response
  res.status(201).json({
    status: "success",
    data: { questionReport },
  });
});

/* 
    @desc  Edit  QuestionReport
    @route PUT /api/v1/questionReport/edit/:id
    @access private
**/
exports.editQuestionReport = catchAsync(async (req, res, next) => {
  let updatedDoc = await QuestionReport.update(req.body, {
    returning: true,
    where: { id: req.params.id },
  });
  // send response
  res.status(201).json({
    status: "success",
    data: {
      updatedDoc,
    },
  });
});

/* 
    @desc Get one QuestionReport
    @route GET /api/v1/questionReport/getOne/:id
    @access private
**/
exports.getOneQuestionReport = catchAsync(async (req, res, next) => {
  const questionReport = await QuestionReport.findOne({
    where: {
      id: req.params.id,
    },
  });
  // check whether the QuestionReport exist or not
  if (!questionReport)
    return next(new AppError("Question Report not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      questionReport,
    },
  });
});

/* 
    @desc Get QuestionReport list
    @route GET /api/v1/questionReport/getAll
    @access private
**/
exports.getAllQuestionReport = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await QuestionReport.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });
  let total = await QuestionReport.count({
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
    @desc POST QuestionReport list
    @route POST /api/v1/questionReport/submit/:questionId
    @access private
**/

exports.submitQuestionReport = catchAsync(async (req, res, next) => {
  if (!req.body.questionReportId || !req.body.questionType) {
    return next(new AppError("questionReportId is required", 404));
  }
  let model = StartTestQuestion;
  if (req.body.questionType === "testSeries") {
    model = UserTestSeriesQuestion;
  }

  const question = await model.findOne({
    where: {
      id: req.params.questionId,
      userId: req.user.id,
    },
  });

  // check whether the QuestionReport exist or not
  if (!question) return next(new AppError("question not found", 404));

  let updatedDoc = await model.update(
    {
      isReported: true,
      questionReportId: req.body.questionReportId,
      reportedText: req.body.reportedText,
    },
    {
      returning: true,
      where: { id: req.params.questionId },
    }
  );

  //send response
  res.status(200).json({
    status: "success",
    data: {
      updatedDoc,
    },
  });
});
