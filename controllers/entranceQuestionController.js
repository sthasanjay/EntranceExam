const { EntranceQuestion, Chapter, Subject, Course } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");
/* 
    @desc Get EntranceQuestion list
    @route GET /api/v1/entrancequestion/getAllEntranceQuestion
    @access private
**/
exports.getAllEntranceQuestion = catchAsync(async (req, res, next) => {
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
