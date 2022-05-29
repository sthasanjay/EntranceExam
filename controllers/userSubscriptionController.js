const { UserSubscription } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
/* 
    @desc Post Course list
    @route POST /api/v1/userSubscription/checkSubscription
    @access private
**/
exports.updateUserSubscription = catchAsync(async (req, res, next) => {
  let result;
  if(!req.body.scopeCategoryId)
  {
    return next(new AppError("scopeCategoryId is required", 400));  
  }

  result = await UserSubscription.findOne({
    where: { userId: req.user.id, scopeCategoryId: req.body.scopeCategoryId },
  });

  if (!result) {
    result = await UserSubscription.create({
      userId: req.user.id,
      scopeCategoryId: req.body.scopeCategoryId,
    });
  }

  //send response
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});
