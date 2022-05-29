const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const { SubscriptionPlan } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { v4 } = require("uuid");
const { Op } = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");

/* 
    @desc Create SubscriptionPlan 
    @route GET /api/v1/admin/subscriptionPlan/create
    @access private
**/
exports.createSubscriptionPlan = catchAsync(async (req, res, next) => {
  let subscriptionPlan;
  // check whether the file exist or not
  if (!req.files || Object.keys(req.files).length === 0) {
    subscriptionPlan = await SubscriptionPlan.create({
      ...req.body,
    });

    // send response
    res.status(201).json({
      status: "success",
      data: { subscriptionPlan },
    });
  } else {
    let file = req.files.file;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new AppError("Please upload an image file", 400));
    }

    // Create custom filename
    file.name = `subscriptionPlan_${v4()}${path.parse(file.name).ext}`;

    file.mv(
      `${process.env.SUBSCRIPTION_PLAN_FILE_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new AppError(`Problem with file upload`, 500));
        }

        subscriptionPlan = await SubscriptionPlan.create({
          ...req.body,
          image: file.name,
        });

        res.status(200).json({
          status: "success",
          data: { subscriptionPlan },
        });
      }
    );
  }
});

/* 
    @desc  Edit  Discussion
    @route PUT /api/v1/admin/subscriptionPlan/edit/:id
    @access private
**/
exports.editSubscriptionPlan = catchAsync(async (req, res, next) => {
  let updatedDoc;
  const subscriptionPlan = await SubscriptionPlan.findOne({
    where: { id: req.params.id },
  });
  // check whether the athlete exist or not
  if (!subscriptionPlan) {
    return next(new AppError("Something Went wrong", 500));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    updatedDoc = await SubscriptionPlan.update(req.body, {
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
    file.name = `subscriptionPlan_${v4()}${path.parse(file.name).ext}`;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new AppError("Please upload an image file", 400));
    }
    //Delete old pic
    if (subscriptionPlan.image) {
      const unlinkAsync = promisify(fs.unlink);
      await unlinkAsync(`./public/uploads/${subscriptionPlan.image}`);
    }

    file.mv(
      `${process.env.SUBSCRIPTION_PLAN_FILE_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new AppError(`Problem with file upload`, 500));
        }

        updatedDoc = await SubscriptionPlan.update(
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
    @desc Get Subject list
    @route GET /api/v1/admin/subscriptionPlan/getAll
    @access private
**/
exports.adminGetAllSubscriptionPlan = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await SubscriptionPlan.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });

  let total = await SubscriptionPlan.count({
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
    @desc Get one Discussion
    @route GET /api/v1/admin/subscriptionPlan/getOne/:id
    @access private
**/
exports.getOneSubscriptionPlan = catchAsync(async (req, res, next) => {
  const subscriptionPlan = await SubscriptionPlan.findOne({
    where: {
      id: req.params.id,
    },
  });
  // check whether the Discussion exist or not
  if (!subscriptionPlan) return next(new AppError("Discussion not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      subscriptionPlan,
    },
  });
});
