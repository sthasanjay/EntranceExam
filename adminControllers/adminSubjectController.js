const { Subject } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Op } = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");
/* 
    @desc Get Subject list
    @route GET /api/v1/admin/subject/getAllSubject
    @access private
**/
exports.adminGetAllSubject = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await Subject.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });

  let total = await Subject.count({
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
    @desc Put Edit Subject 
    @route PUT /api/v1/admin/subject/editSubject/:id
    @access private
**/
exports.adminEditSubject = catchAsync(async (req, res, next) => {
  let updatedDoc;
  const question = await Subject.findOne({
    where: { subjectId: req.params.id },
  });
  // check whether the athlete exist or not
  if (!question) {
    return next(new AppError("Something Went wrong", 500));
  }

  updatedDoc = await Subject.update(req.body, {
    returning: true,
    where: { subjectId: req.params.id },
  });

  res.status(200).json({
    status: "success",
    data: { updatedDoc },
  });
});