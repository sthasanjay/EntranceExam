const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const { BankPayment, User, SubscriptionPlan } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { v4 } = require("uuid");
const subscriptionPlan = require("../models/subscriptionPlan");
/* 
    @desc Create Bank Payment
    @route POST /api/v1/bankPayment/create
    @access private
**/
exports.createBankPayment = catchAsync(async (req, res, next) => {
  let bankPayment;

  if (req.body.isApproved || req.body.approvedBy || req.body.approvedDate) {
    return next(new AppError("Invalid Inputs", 400));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new AppError("Please upload an image file", 400));
  }

  let file = req.files.file;
  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new AppError("Please upload an image file", 400));
  }

  const subscriptionPlan = await SubscriptionPlan.findOne({
    where: { id: req.body.subscriptionPlanId, isActive: true },
  });
  if (!subscriptionPlan) {
    return next(new AppError("Subscription Plan Info not found", 404));
  }
  // Create custom filename
  file.name = `bankPayment_${v4()}${path.parse(file.name).ext}`;
  file.mv(
    `${process.env.BANKPAYMENT_FILE_UPLOAD_PATH}/${file.name}`,
    async (err) => {
      if (err) {
        console.error(err);
        return next(new AppError(`Problem with file upload`, 500));
      }

      bankPayment = await BankPayment.create({
        ...req.body,
        requestId: v4(),
        userId: req.user.id,
        depositedImage: file.name,
      });

      res.status(200).json({
        status: "success",
        data: { bankPayment },
      });
    }
  );
});
