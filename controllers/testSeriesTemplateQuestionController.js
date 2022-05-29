const { Subject, Chapter,TestSeriesTemplate,TestSeriesTemplateQuestion,EntranceQuestion,UserTestSeriesLog } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

/* 
    @desc Get Test Series Template Question List
    @route GET /api/v1/testSeriesTemplateQuestion/getAllTestSeriesTemplateQuestion/:templateId
    @access private
**/
exports.getAllTestSeriesTemplateQuestion = catchAsync(async (req, res, next) => {
  let result;

  result = await TestSeriesTemplateQuestion.findAll({
    where: { templateId: req.params.templateId },
    attributes: ["templateId","questionId"],

    include: [
      {
        model: EntranceQuestion,
        attributes: ["questionId"],
      },
    ],
  });

  //send response
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});


