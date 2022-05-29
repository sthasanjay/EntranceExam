const { SmartGatewayCredential } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Op } = require("sequelize");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");

/* 
    @desc Put Edit Subject 
    @route PUT /api/v1/admin/subject/editSubject/:id
    @access private
**/
exports.adminCreateSmartGatewayCred = catchAsync(async (req, res, next) => {
  const smartGatewayCredential = await SmartGatewayCredential.create(req.body);

  res.status(200).json({
    status: "success",
    data: { smartGatewayCredential },
  });
});
