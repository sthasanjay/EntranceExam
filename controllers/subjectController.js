const { Subject, Chapter } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");

/* 
    @desc Get Subject list
    @route GET /api/v1/subject/getAllSubject
    @access private
**/
exports.getAllSubject = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await Subject.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
    include: [
      {
        model: Chapter,
        attributes: ["chapterId", "chapterName"],

        include: {
          model: Chapter,
          hierarchy: true,
          attributes: ["chapterId", "chapterName", "parentId"],
        },
      },
    ],
  });
  let total = await Subject.count({
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
