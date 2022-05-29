const { Chapter } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Op } = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");
/* 
    @desc Get Chapter list
    @route GET /api/v1/admin/chapter/getAllParentChapter
    @access private
**/
exports.adminGetAllParentChapter = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await Chapter.findAll({
    where: { ...feature.queryObj, parentId: null },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });

  let total = await Chapter.count({
    where: { ...feature.queryObj, parentId: null },
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
    @desc Get Chapter list
    @route GET /api/v1/admin/chapter/getChapterByParentId/:parentId
    @access private
**/
exports.adminChapterByParent = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await Chapter.findAll({
    where: { ...feature.queryObj, parentId: req.params.parentId },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });

  let total = await Chapter.count({
    where: { ...feature.queryObj, parentId: req.params.parentId },
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
    @desc Put Edit Chapter 
    @route PUT /api/v1/admin/chapter/editChapter/:id
    @access private
**/
exports.adminEditChapter = catchAsync(async (req, res, next) => {
  let updatedDoc;
  const question = await Chapter.findOne({
    where: { chapterId: req.params.id },
  });
  // check whether the athlete exist or not
  if (!question) {
    return next(new AppError("Something Went wrong", 500));
  }

  updatedDoc = await Chapter.update(req.body, {
    returning: true,
    where: { chapterId: req.params.id },
  });

  res.status(200).json({
    status: "success",
    data: { updatedDoc },
  });
});

/* 
    @desc Get Chapter list
    @route GET /api/v1/admin/chapter/getAllChapter
    @access private
**/
exports.adminGetAllChapter = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await Chapter.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
    include: {
      model: Chapter,
      hierarchy: true,
      attributes: ["chapterId", "chapterName", "parentId"],
    },
  });
  let total = await Chapter.count({
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
