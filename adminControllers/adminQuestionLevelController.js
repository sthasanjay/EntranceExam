const { QuestionLevel } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Op } = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");
/* 
    @desc Get QuestionLevel list
    @route GET /api/v1/admin/level/getAllLevel
    @access private
**/
exports.adminGetAllQuestionLevel = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await QuestionLevel.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });

  let total = await QuestionLevel.count({
    where: { ...feature.queryObj},
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
    @desc Put Edit QuestionLevel 
    @route PUT /api/v1/admin/level/editQuestionLevel/:id
    @access private
**/
exports.adminEditQuestionLevel = catchAsync(async (req, res, next) => {
  let updatedDoc;
  const question = await QuestionLevel.findOne({
    where: { id: req.params.id },
  });
  // check whether the athlete exist or not
  if (!question) {
    return next(new AppError("Something Went wrong", 500));
  }

  updatedDoc = await QuestionLevel.update(req.body, {
    returning: true,
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    data: { updatedDoc },
  });
});