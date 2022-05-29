const { BadWord } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");

/* 
    @desc Create BadWord
    @route POST /api/v1/admin/badWord/create
    @access private
**/
exports.adminCreateBadWord = catchAsync(async (req, res, next) => {
  const badWord = await BadWord.create(req.body);
  // send response
  res.status(201).json({
    status: "success",
    data: {
      badWord,
    },
  });
});

/* 
    @desc Edit BadWord
    @route PUT /api/v1/admin/badWord/edit/:id
    @access private
**/
exports.editCreateBankAccount = catchAsync(async (req, res, next) => {
  const updatedDoc = await BadWord.update(
    { ...req.body },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  // send response
  res.status(201).json({
    status: "success",
    data: {
      updatedDoc,
    },
  });
});

/* 
    @desc Create BadWord
    @route POST /api/v1/admin/badWord/getAll
    @access private
**/
exports.adminGetallBadWord = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await BadWord.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });
  let total = await BadWord.count({
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
