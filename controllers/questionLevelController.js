const { QuestionLevel } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
/* 
    @desc Get Question list
    @route GET /api/v1/questionLevel/getAll
    @access private
**/
exports.getAllQuestion = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await QuestionLevel.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });
  let total = await QuestionLevel.count({
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
