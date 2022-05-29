const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const Sequelize = require("sequelize");
const {
  User,
  EntranceQuestion,
  Subject,
  Chapter,
  StartTestLog,
  StartTestQuestion,
} = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { v4 } = require("uuid");
const { Op } = require("sequelize");
/* 
    @desc generate Test Start Test
    @route POST /api/v1/startTest/generate
    @access private
**/
exports.generateStartTest = catchAsync(async (req, res, next) => {
  let result;
  let questions = [];
  let remainderQuestion = [];
  let chapterArray = req.body.chapters;
  let startTestQuestionArray = [];
  let testCompleted = false;
  let weight = req.body.weight || 1;
  console.log("from here", req.body);
  //calculate number questions per chapter
  const limit = Math.trunc(req.body.questionNumber / req.body.chapters.length);
  //calculate chapter remainder
  const remainderlimit = req.body.questionNumber % req.body.chapters.length;
  //static temporary
  const notInArray = [20, 52];

  result = await getChapter(req.body.chapters, notInArray, limit, weight);

  await Promise.all(
    result.map(async (el) => {
      questions.push(...el.EntranceQuestions);
    })
  );
  if (remainderlimit) {
    let lastChapterArray = [chapterArray[chapterArray.length - 1]];

    remainderQuestion = await getChapter(
      lastChapterArray,
      notInArray,
      remainderlimit,
      weight,
      limit
    );

    await Promise.all(
      remainderQuestion.map(async (el) => {
        questions.push(...el.EntranceQuestions);
      })
    );
  }
  questions.sort((a, b) => parseFloat(a.chapterId) - parseFloat(b.chapterId));

  const startTestLog = await StartTestLog.create({
    userId: req.user.id,
    totalQuestionCount: questions.length,
    scopeCategoryId: req.query.scopeCategoryId,
  });
  await Promise.all(
    questions.map(async (el) => {
      startTestQuestionArray.push({
        startTestLogId: startTestLog.id,
        userId: req.user.id,
        questionId: el.questionId,
        chapterId: el.chapterId,
        subjectId: el.subjectId,
        levelId: el.levelId,
        scopeCategoryId: req.query.scopeCategoryId,
      });
    })
  );

  const startTestQuestion = await StartTestQuestion.bulkCreate(
    startTestQuestionArray
  );

  //send response
  res.status(200).json({
    status: "success",
    testCompleted,
    count: questions.length,
    startTestLogId: startTestLog.id,
    data: {
      questions,
    },
  });
});

/* 
    @desc Create Discussion
    @route POST /api/v1/startTest/submitQuestion/:questionId
    @access private
**/
exports.submitQuestion = catchAsync(async (req, res, next) => {
  let isCorrect = false;
  let hasAttempted = true;

  const getQuestion = await StartTestQuestion.findOne({
    where: {
      questionId: req.params.questionId,
      startTestLogId: req.body.startTestLogId,
    },
  });
  const getStartTestLog = await StartTestLog.findOne({
    where: {
      id: req.body.startTestLogId,
    },
  });
  if (!getStartTestLog)
    return next(new AppError("This getStartTestLog Doesnt Exist", 400));

  if (!getQuestion || getQuestion.hasAttempted || getStartTestLog.isSubmitted)
    return next(
      new AppError("This Question Doesnt Exist or Already Answered", 400)
    );

  await StartTestLog.increment("attemptedCount", {
    by: 1,
    where: { id: req.body.startTestLogId },
  });

  if (getQuestion.correctOption == req.body.submittedOption) {
    isCorrect = true;
    await StartTestLog.increment("correctCount", {
      by: 1,
      where: { id: req.body.startTestLogId },
    });
  } else {
    await StartTestLog.increment("wrongCount", {
      by: 1,
      where: { id: req.body.startTestLogId },
    });
  }
  const startTestQuestion = await StartTestQuestion.update(
    { hasAttempted, isCorrect, selectedAnswer: req.body.submittedOption },
    {
      where: {
        questionId: req.params.questionId,
        startTestLogId: req.body.startTestLogId,
      },
      returning: true,
      plain: true,
    }
  );
  // console.log("from here", startTestQuestion);
  //send response
  res.status(200).json({
    status: "success",
    data: {
      startTestQuestion: startTestQuestion[1].dataValues,
    },
  });
});

/* 
    @desc Create Discussion
    @route PATCH /api/v1/startTest/submitStartTest/:startTestLogId
    @access private
**/
exports.setSubmitQuestion = catchAsync(async (req, res, next) => {
  const startTestLog = await StartTestLog.update(
    { isSubmitted: req.body.isSubmitted },
    {
      where: {
        id: req.params.startTestLogId,
      },
      returning: true,
      plain: true,
    }
  );

  //send response
  res.status(200).json({
    status: "success",
    data: {
      startTestLog: startTestLog[1].dataValues,
    },
  });
});

async function getChapter(chapterArray, notInArray, limit, weight, offset = 0) {
  let questionFilter = {
    id: { [Op.notIn]: notInArray },
    isModelQuestion: false,
  };
  if (weight) {
    questionFilter.weight = weight;
  }
  let result = await Chapter.findAll({
    where: {
      isActive: true,
      chapterId: { [Op.in]: chapterArray },
    },

    include: [
      {
        model: EntranceQuestion,
        attributes: [
          "id",
          "questionId",
          "chapterId",
          "subjectId",
          "levelId",
          "correctOption",
        ],
        separate: true,
        order: Sequelize.literal("random()"),
        where: questionFilter,
        limit: limit,
        offset,
        include: {
          model: Subject,
          hierarchy: true,
          attributes: ["subjectName"],
        },
      },
    ],
  });

  return result;
}

/* 
    @desc generate Test Start Test
    @route GET /api/v1/startTest/performanceSummary/:startTestLogId
    @access private
**/
exports.performanceSummary = catchAsync(async (req, res, next) => {
  const startTestLog = await StartTestLog.findOne({
    where: { id: req.params.startTestLogId },
  });
  const startTestQuestion = await StartTestQuestion.findAll({
    where: { startTestLogId: req.params.startTestLogId },
    include: [
      {
        model: Subject,
        attributes: ["id", "subjectName"],
      },
      {
        model: Chapter,
        attributes: ["id", "chapterName", "parentId"],
      },
    ],
  });
  let parentChaptersArray = [];
  let parentChaptersSet;
  let parentMapArray = [];
  let response = [];

  await Promise.all(
    startTestQuestion.map(async (el) => {
      if (el.Chapter.parentId) {
        parentChaptersArray.push(el.Chapter.parentId);
      }
    })
  );

  parentChaptersSet = [...new Set(parentChaptersArray)];

  await Promise.all(
    parentChaptersSet.map(async (el) => {
      const parentChapter = await Chapter.findOne({
        where: { chapterId: el },
      });

      parentMapArray.push({
        parentId: el,
        parentName: parentChapter.chapterName,
      });
    })
  );

  await Promise.all(
    startTestQuestion.map(async (el) => {
      if (el.Chapter.parentId) {
        let temObj = {};
        temObj = el.dataValues;
        temObj.parentChapterName = parentMapArray.find(
          (x) => x.parentId === el.Chapter.parentId
        ).parentName;
        response.push(temObj);
      }
    })
  );

  //send response
  res.status(200).json({
    status: "success",
    data: {
      startTestLog,
      response,
    },
  });
});
