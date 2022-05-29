const {
  BankAccount,
  BankPayment,
  User,
  TransactionHistory,
  SubscriptionPlan,
  UserSubscription,
} = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { v4 } = require("uuid");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");

/* 
    @desc Verify BankPayment
    @route PUT /api/v1/admin/bankPayment/verify/:id
    @access private
**/
exports.verifyBankPayment = catchAsync(async (req, res, next) => {
  let updatedBankPayment, updatedUser;

  //Step 1:  Check if Bank Payment  is valid
  const bankPayment = await BankPayment.findOne({
    where: { id: req.params.id },
  });
  if (!bankPayment) {
    return next(new AppError("Bank Payment Info not found", 404));
  }
  //Step 2:  Check if Subscription Plan  is valid
  const subscriptionPlan = await SubscriptionPlan.findOne({
    where: { id: bankPayment.subscriptionPlanId, isActive: true },
  });
  if (!subscriptionPlan) {
    return next(new AppError("Subscription Plan Info not found", 404));
  }
  //Step 3:  Check if Bank Account Plan  is valid
  const bankAccount = await BankAccount.findOne({
    where: { id: bankPayment.bankId },
  });
  if (!bankAccount) {
    return next(new AppError("Bank Account Info not found", 404));
  }
  //Step 4:  Check if User is valid
  const user = await User.findOne({
    where: { id: bankPayment.userId, isActive: true },
  });
  if (!user) {
    return next(new AppError("User Info not found", 404));
  }
  //Step 5:  Case A:  If bank payment is approved
  if (req.body.paymentStatus === "approved") {
    //Step 6:  Create Transaction or approved Bank Payment
    const transactionHistory = await TransactionHistory.create({
      userId: bankPayment.userId,
      scopeCategoryId: subscriptionPlan.scopeCategoryId,
      subscriptionId: subscriptionPlan.id,
      bankPaymentId: bankPayment.id,
      requestId: bankPayment.requestId,
      amount: bankPayment.depositedAmount,
      requestDate: Date.now(),
      payMethod: "BANK",
    });
    //Step 7:  Check Transaction is created
    if (!transactionHistory) {
      return next(new AppError("Something went wrong", 500));
    }
    //Step 8: Function to update userSubscription
    let userSubscription = await updateUserSubscription(
      bankPayment,
      subscriptionPlan
    );
    //Step 9: Check if userSubscription is valid
    if (!userSubscription) {
      return next(
        new AppError("Something went wrong at userSubscription", 500)
      );
    }
    //Step 10: Update user role to Paid
    updatedUser = await User.update(
      { role: "paidUser" },
      {
        returning: true,
        where: {
          id: bankPayment.userId,
        },
        include: {
          model: UserSubscription,
          attributes: ["scopeCategoryId", "isFree"],
        },
      }
    );
    //Step 10: Update Bank payment status to Approved
    updatedBankPayment = await BankPayment.update(
      {
        paymentStatus: req.body.paymentStatus,
        approvedBy: req.user.id,
        approvedDate: new Date(),
      },
      {
        returning: true,
        where: {
          id: bankPayment.id,
        },
      }
    );
    //return Json
    res.status(200).json({
      status: "success",
      data: { updatedBankPayment, updatedUser },
    });
  }
  //Step 5:  Case A:  If bank payment is rejected
  else if (req.body.paymentStatus === "rejected") {
    updatedBankPayment = await BankPayment.update(
      { paymentStatus: req.body.paymentStatus },
      {
        returning: true,
        where: {
          id: bankPayment.id,
        },
      }
    );
    //return Json
    res.status(200).json({
      status: "success",
      data: { updatedBankPayment, updatedUser },
    });
  }
});

/**
 * provideFrontEnd
 * @function
 * @param {Object} bankPayment ,
 * @param {Object} subscriptionPlan ,
 * @return {Object}
 */

async function updateUserSubscription(bankPayment, subscriptionPlan) {
  let userSubscription;
  let todayDate = new Date();
  //Step 1: Set expiry Date
  let expiryDate = todayDate.setDate(
    todayDate.getDate() + subscriptionPlan.durationInDays
  );
  //Step 2: Check User Subscription already exist for given scope|course
  let checkUserSubscription = await UserSubscription.findOne({
    where: {
      userId: bankPayment.userId,
      subscriptionPlanId: subscriptionPlan.id,
    },
  });
  //Step 3:  Case A: if User Subscription is found set payment Information
  if (checkUserSubscription) {
    userSubscription = await UserSubscription.update(
      { expiryDate, isFree: false },
      {
        returning: true,
        where: {
          userId: bankPayment.userId,
          subscriptionPlanId: subscriptionPlan.id,
          isFree: true,
        },
      }
    );
    console.log(" inside If", userSubscription);
    //function return here
    return userSubscription;
  }
  //Step 3:  Case B: if User Subscription is not found set payment Information
  else {
    userSubscription = await UserSubscription.update(
      { expiryDate, subscriptionPlanId: subscriptionPlan.id, isFree: false },
      {
        returning: true,
        where: {
          userId: bankPayment.userId,
          scopeCategoryId: subscriptionPlan.scopeCategoryId,
          isFree: true,
        },
      }
    );
    console.log(" inside else", userSubscription);
    //function return here
    return userSubscription;
  }
}
