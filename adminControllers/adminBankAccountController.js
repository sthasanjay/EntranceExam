const { BankAccount } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");

/* 
    @desc Create BankAccount
    @route POST /api/v1/admin/bankAccount/create
    @access private
**/
exports.adminCreateBankAccount = catchAsync(async (req, res, next) => {
  const bankAccount = await BankAccount.create(req.body);
  // send response
  res.status(201).json({
    status: "success",
    data: {
      bankAccount,
    },
  });
});

/* 
    @desc EDIT BankAccount
    @route PUT /api/v1/admin/bankAccount/edit/:id
    @access private
**/
exports.adminEditBankAccount = catchAsync(async (req, res, next) => {
  let updatedDoc = await BankAccount.update(req.body, {
    returning: true,
    where: { id: req.params.id },
  });

  if (!updatedDoc) {
    return next(new AppError("Bank Account not found", 404));
  }
  // send response
  res.status(201).json({
    status: "success",
    data: {
      updatedDoc,
    },
  });
});

/* 
    @desc Get BankAccount list
    @route GET /api/v1/admin/bankAccount/getAll
    @access private
**/
exports.getAllBankAccount = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await BankAccount.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });
  let total = await BankAccount.count({
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
@desc Get one BankAccount
@route GET /api/v1/admin/bankAccount/getOne/:id
@access private
**/
exports.adminGetOneBankAccount = catchAsync(async (req, res, next) => {
  const bankAccount = await BankAccount.findOne({
    where: {
      id: req.params.id,
    },
  });
  // check whether the BankAccount exist or not
  if (!bankAccount) return next(new AppError("BankAccount not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      bankAccount,
    },
  });
});
