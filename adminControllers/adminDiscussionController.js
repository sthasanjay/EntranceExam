const { Discussion, DiscussionReply, User } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");
/* 
@desc Get one Discussion
@route GET /api/v1/admin/discussion/getOne/:id
@access private
**/
exports.adminGetOneDiscussion = catchAsync(async (req, res, next) => {
  const discussion = await Discussion.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: DiscussionReply,
      },
      {
        model: User,
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
          "profileImage",
          "role",
        ],
      },
    ],
  });
  // check whether the Discussion exist or not
  if (!discussion) return next(new AppError("Discussion not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      discussion,
    },
  });
});

/* 
@desc Get Discussion list
@route GET /api/v1/admin/discussion/getAll
@access private
**/
exports.adminGetAllDiscussion = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);
  let result = await Discussion.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });

  let total = await Discussion.count({
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
