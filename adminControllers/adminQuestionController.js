const { EntranceQuestion, Subject, Course } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Op } = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");
/* 
    @desc Get EntranceQuestion list
    @route GET /api/v1/admin/question/getAllQuestion
    @access private
**/
exports.adminGetAllEntranceQuestion = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await EntranceQuestion.findAll({
    where: { ...feature.queryObj },
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
    @desc Put EntranceQuestion list
    @route PUT /api/v1/admin/question/editQuestion/:id
    @access private
**/
exports.adminEditEntranceQuestion = catchAsync(async (req, res, next) => {
  let updatedDoc;
  const question = await EntranceQuestion.findOne({
    where: { questionId: req.params.id },
  });
  // check whether the athlete exist or not
  if (!question) {
    return next(new AppError("Something Went wrong", 500));
  }

  updatedDoc = await EntranceQuestion.update(req.body, {
    returning: true,
    where: { questionId: req.params.id },
  });

  res.status(200).json({
    status: "success",
    data: { updatedDoc },
  });
});

/* 
    @desc Get One EntranceQuestion 
    @route GET /api/v1/entrancequestion/getOneEntranceQuestion/:id
    @access private
**/
exports.getOneEntranceQuestion = catchAsync(async (req, res, next) => {
  const entranceQuestion = await EntranceQuestion.findOne({
    where: { questionId: req.params.id },
  });

  // check whether the athlete exist or not
  if (!entranceQuestion) {
    return next(new AppError("Something Went wrong", 500));
  }

  res.status(200).json({
    status: "success",
    data: { entranceQuestion },
  });
});

/* 
    @desc Post Create EntranceQuestion 
    @route POST /api/v1/admin/question/create
    @access private
**/
exports.adminCreateEntranceQuestion = catchAsync(async (req, res, next) => {
  const entranceQuestion = await EntranceQuestion.create({
    ...req.body,
  });

  res.status(200).json({
    status: "success",
    data: { entranceQuestion },
  });
});
