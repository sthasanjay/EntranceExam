const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const { Discussion, DiscussionReply, User, BadWord } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { v4 } = require("uuid");
const { Op } = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");

let Filter = require("bad-words"),
  filter = new Filter();

/* 
    @desc Create Discussion
    @route POST /api/v1/discussion/create
    @access private
**/
exports.createDiscussion = catchAsync(async (req, res, next) => {
  let discussion;

  //Check for badWords
  const badWords = await BadWord.findAll({
    attributes: ["badWordName"],
    raw: true,
  });
  let extractedValue = badWords.map((item) => item["badWordName"]);
  filter.addWords(...extractedValue);
  let filteredWords = filter.clean(req.body.question);
  let wordCheck = filteredWords.includes("***");
  if (wordCheck) {
    return next(new AppError("Unacceptable words detected!", 500));
  }

  // check whether the file exist or not
  if (!req.files || Object.keys(req.files).length === 0) {
    discussion = await Discussion.create({
      ...req.body,
      scopeCategoryId: req.query.scopeCategoryId,
      userId: req.user.id,
    });

    // send response
    res.status(201).json({
      status: "success",
      data: { discussion },
    });
  } else {
    let file = req.files.file;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new AppError("Please upload an image file", 400));
    }

    // Create custom filename
    file.name = `discussion_${v4()}${path.parse(file.name).ext}`;

    file.mv(
      `${process.env.DISCUSSION_FILE_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new AppError(`Problem with file upload`, 500));
        }

        discussion = await Discussion.create({
          ...req.body,
          image: file.name,
        });

        res.status(200).json({
          status: "success",
          data: { discussion },
        });
      }
    );
  }
});

/* 
    @desc  Edit  Discussion
    @route PUT /api/v1/discussion/edit/:id
    @access private
**/
exports.editDiscussion = catchAsync(async (req, res, next) => {
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
  const discussion = await Discussion.findOne({ where: { id: req.params.id } });
  // check whether the athlete exist or not
  if (!discussion) {
    return next(new AppError("Something Went wrong", 500));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    updatedDoc = await Discussion.update(req.body, {
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
    file.name = `discussion_${v4()}${path.parse(file.name).ext}`;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new AppError("Please upload an image file", 400));
    }
    //Delete old pic
    if (discussion.image) {
      const unlinkAsync = promisify(fs.unlink);
      await unlinkAsync(`./public/uploads/${discussion.image}`);
    }

    file.mv(
      `${process.env.DISCUSSION_FILE_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new AppError(`Problem with file upload`, 500));
        }

        updatedDoc = await Discussion.update(
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
    @desc Get one Discussion
    @route GET /api/v1/discussion/getOne/:id
    @access private
**/
exports.getOneDiscussion = catchAsync(async (req, res, next) => {
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
    @route GET /api/v1/discussion/getAll
    @access private
**/
exports.getAllDiscussion = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);
  let result = await Discussion.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
    include: {
      model: DiscussionReply,
      include: {
        model: DiscussionReply,
        hierarchy: true,
        attributes: ["discussionId", "replyMessage"],
      },
    },
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
