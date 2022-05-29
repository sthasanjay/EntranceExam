
const { DiscussionReply, Discussion } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");

/* 
    @desc Get one DiscussionReply
    @route GET /api/v1/discussionReply/getOne/:id
    @access private
**/
exports.adminGetOneDiscussionReply = catchAsync(async (req, res, next) => {
    const discussionReply = await DiscussionReply.findOne({
      where: {
        id: req.params.id,
      },
    });
    // check whether the DiscussionReply exist or not
    if (!discussionReply)
      return next(new AppError("DiscussionReply not found", 404));
  
    res.status(200).json({
      status: "success",
      data: {
        discussionReply,
      },
    });
  });
  
  /* 
      @desc Get DiscussionReply List
      @route GET /api/v1/discussionReply/getAll
      @access private
  **/
  exports.admingGetAllDiscussionReply = catchAsync(async (req, res, next) => {
    let feature = apiFeature(req.query);
    let result = await DiscussionReply.findAll({
      where: { ...feature.queryObj },
      offset: feature.offset,
      limit: feature.limit,
      order: [feature.order],
      attributes: feature.attributes,
      include: {
        model: DiscussionReply,
        hierarchy: true,
        attributes: ["parentDiscussionReplyId", "replyMessage"],
      },
    });
    let total = await DiscussionReply.count({
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