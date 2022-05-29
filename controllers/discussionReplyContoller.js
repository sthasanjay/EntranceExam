const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const { DiscussionReply, Discussion, BadWord } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { v4 } = require("uuid");
const discussion = require("../models/discussion");
const { Op } = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");
let Filter = require("bad-words"),
  filter = new Filter();
/* 
    @desc Create DiscussionReply
    @route POST /api/v1/discussionReply/create/:discussionId
    @access private
**/
exports.createDiscussionReply = catchAsync(async (req, res, next) => {
  let discussionReply;
  //Check for badWords
  const badWords = await BadWord.findAll({
    attributes: ["badWordName"],
    raw: true,
  });
  let extractedValue = badWords.map((item) => item["badWordName"]);
  filter.addWords(...extractedValue);
  let filteredWords = filter.clean(req.body.replyMessage);
  let wordCheck = filteredWords.includes("***");
  if (wordCheck) {
    return next(new AppError("Unacceptable words detected!", 500));
  }

  const discussion = await Discussion.findOne({
    where: { id: req.params.discussionId },
  });
  if (!discussion) return next(new AppError("Discussion Not Found", 400));
  // check whether the file exist or not
  if (!req.files || Object.keys(req.files).length === 0) {
    discussionReply = await DiscussionReply.create({
      ...req.body,
      discussionId: req.params.discussionId,
      scopeCategoryId: discussion.scopeCategoryId,
      discussCategoryId: discussion.discussCategoryId,
      userId: req.user.id,
    });
    const discuss = await Discussion.increment("replyCount", {
      by: 1,
      where: { id: req.params.discussionId },
    });
    // send response
    res.status(201).json({
      status: "success",
      data: { discussionReply },
    });
  } else {
    let file = req.files.file;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new AppError("Please upload an image file", 400));
    }

    // Create custom filename
    file.name = `slider_${v4()}${path.parse(file.name).ext}`;

    file.mv(
      `${process.env.DISCUSSION_REPLY_FILE_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new AppError(`Problem with file upload`, 500));
        }

        discussionReply = await DiscussionReply.create({
          ...req.body,
          discussionId: req.params.discussionId,
          image: file.name,
          scopeCategoryId: discussion.scopeCategoryId,
          discussCategoryId: discussion.discussCategoryId,
          userId: req.user.id,
        });
        await Discussion.increment("replyCount", {
          by: 1,
          where: { id: req.params.discussionId },
        });

        res.status(200).json({
          status: "success",
          data: { discussionReply },
        });
      }
    );
  }
});

/* 
    @desc  Edit  DiscussionReply
    @route PUT /api/v1/discussionReply/edit/:id
    @access private
**/
exports.editDiscussionReply = catchAsync(async (req, res, next) => {
  let updatedDoc;
  //Check for badWords
  const badWords = await BadWord.findAll({
    attributes: ["badWordName"],
    raw: true,
  });
  let extractedValue = badWords.map((item) => item["badWordName"]);
  filter.addWords(...extractedValue);
  let filteredWords = filter.clean(req.body.replyMessage);
  let wordCheck = filteredWords.includes("***");
  if (wordCheck) {
    return next(new AppError("Unacceptable words detected!", 500));
  }
  const discussionReply = await DiscussionReply.findOne({
    where: { id: req.user.id },
  });
  // check whether the athlete exist or not
  if (!discussionReply) {
    return next(new AppError("Something Went wrong", 500));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    updatedDoc = await DiscussionReply.update(req.body, {
      returning: true,
      where: { id: req.params.id },
    });
    // send response
    res.status(201).json({
      status: "success",
      data: {
        updatedDoc,
      },
    });
  } else {
    let file = req.files.file;
    // Create custom filename
    file.name = `slider_${v4()}${path.parse(file.name).ext}`;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new AppError("Please upload an image file", 400));
    }
    //Delete old pic
    if (discussionReply.image) {
      const unlinkAsync = promisify(fs.unlink);
      await unlinkAsync(`./public/uploads/${discussionReply.image}`);
    }

    file.mv(
      `${process.env.DISCUSSION_REPLY_FILE_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new AppError(`Problem with file upload`, 500));
        }

        updatedDoc = await DiscussionReply.update(
          { ...req.body, image: file.name },
          { where: { id: req.user.id } }
        );

        res.status(200).json({
          status: "success",
          data: { updatedDoc },
        });
      }
    );
  }
});

/* 
    @desc Get one DiscussionReply
    @route GET /api/v1/discussionReply/getOne/:id
    @access private
**/
exports.getOneDiscussionReply = catchAsync(async (req, res, next) => {
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
exports.getAllDiscussionReply = catchAsync(async (req, res, next) => {
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

/* 
    @desc Create DiscussionSecondReply
    @route POST /api/v1/discussionReply/createSecondDiscussionReply/:discussionReplyId
    @access private
**/
exports.createSecondDiscussionReply = catchAsync(async (req, res, next) => {
  let discussionSecondReply;
  //Check for badWords
  const badWords = await BadWord.findAll({
    attributes: ["badWordName"],
    raw: true,
  });
  let extractedValue = badWords.map((item) => item["badWordName"]);
  filter.addWords(...extractedValue);
  let filteredWords = filter.clean(req.body.replyMessage);
  let wordCheck = filteredWords.includes("***");
  if (wordCheck) {
    return next(new AppError("Unacceptable words detected!", 500));
  }
  const discussionReply = await DiscussionReply.findOne({
    where: { id: req.params.discussionReplyId, parentDiscussionReplyId: null },
  });
  if (!discussionReply)
    return next(new AppError("Parent Discussion Reply Not Found", 400));
  // check whether the file exist or not
  console.log("from here", discussionReply);
  if (!req.files || Object.keys(req.files).length === 0) {
    discussionSecondReply = await DiscussionReply.create({
      ...req.body,
      discussionId: discussionReply.discussionId,
      scopeCategoryId: discussionReply.scopeCategoryId,
      discussCategoryId: discussionReply.discussCategoryId,

      userId: req.user.id,
      parentDiscussionReplyId: discussionReply.id,
    });
    const discuss = await Discussion.increment("replyCount", {
      by: 1,
      where: { id: req.params.discussionReplyId },
    });
    // send response
    res.status(201).json({
      status: "success",
      data: { discussionSecondReply },
    });
  } else {
    let file = req.files.file;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new AppError("Please upload an image file", 400));
    }

    // Create custom filename
    file.name = `slider_${v4()}${path.parse(file.name).ext}`;

    file.mv(
      `${process.env.DISCUSSION_REPLY_FILE_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new AppError(`Problem with file upload`, 500));
        }

        discussionSecondReply = await DiscussionReply.create({
          ...req.body,
          discussionId: discussionReply.discussionId,
          scopeCategoryId: discussionReply.scopeCategoryId,
          discussCategoryId: discussionReply.discussCategoryId,
          userId: req.user.id,
          parentDiscussionReplyId: discussionReply.id,
          image: file.name,
        });
        await Discussion.increment("replyCount", {
          by: 1,
          where: { id: req.params.discussionReplyId },
        });

        res.status(200).json({
          status: "success",
          data: { discussionSecondReply },
        });
      }
    );
  }
});
