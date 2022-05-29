const { Chapter } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Op } = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");
/* 
    @desc Get Chapter list
    @route GET /api/v1/chapter/getAllChapter
    @access private
**/
exports.getAllChapter = catchAsync(async (req, res, next) => {
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
