const { QuestionReport } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const apiFeature = require("../utils/apiFeaturesSequelize");
/* 
    @desc Create QuestionReport
    @route POST /api/v1/admin/questionReport/create
    @access private
**/
exports.adminCreateQuestionReport = catchAsync(async (req, res, next) => {
  if (!req.body.reportTitle) {
    return next(new AppError("reportTitle is Required", 500));
  }
  let questionReport = await QuestionReport.create(req.body);

  // send response
  res.status(201).json({
    status: "success",
    data: { questionReport },
  });
});

/* 
    @desc  Edit  QuestionReport
    @route PUT /api/v1/admin/questionReport/edit/:id
    @access private
**/
exports.adminEditQuestionReport = catchAsync(async (req, res, next) => {
  let updatedDoc = await QuestionReport.update(req.body, {
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
});


/* 
    @desc Get QuestionReport list
    @route GET /api/v1/admin/questionReport/getAll
    @access private
**/
exports.adminGetAllQuestionReport = catchAsync(async (req, res, next) => {
  let feature = apiFeature(req.query);

  let result = await QuestionReport.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
  });

  //send response
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});