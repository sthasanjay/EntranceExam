const { Course } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Op } = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");
/* 
    @desc Get Course list
    @route GET /api/v1/admin/course/getAllCourse
    @access private
**/
exports.adminGetAllCourse = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await Course.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });

  let total = await Course.count({
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
    @desc Get One Course 
    @route GET /api/v1/admin/course/getOne/:id
    @access private
**/
exports.adminGetCourseById = catchAsync(async (req, res, next) => {
  let course = await Course.findOne({
    where: { courseId: req.params.id },
  });

  if (!course) {
    return next(new AppError("Course not found", 500));
  }
  //send response
  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

/* 
    @desc Put Edit Course 
    @route PUT /api/v1/admin/course/editCourse/:id
    @access private
**/
exports.adminEditCourse = catchAsync(async (req, res, next) => {
  let updatedDoc;
  const question = await Course.findOne({
    where: { courseId: req.params.id },
  });
  // check whether the athlete exist or not
  if (!question) {
    return next(new AppError("Something Went wrong", 500));
  }

  updatedDoc = await Course.update(req.body, {
    returning: true,
    where: { courseId: req.params.id },
  });

  res.status(200).json({
    status: "success",
    data: { updatedDoc },
  });
});

/* 
    @desc Post Create Course 
    @route POST /api/v1/admin/course/createCourse
    @access private
**/
exports.adminCreateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.create(req.body);
  // send response
  res.status(201).json({
    status: "success",
    data: {
      course,
    },
  });
});
