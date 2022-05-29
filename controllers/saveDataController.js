const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const {
  QuestionLevel,
  Course,
  Chapter,
  Subject,
  EntranceQuestion,
} = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sequelize = require("sequelize");
const { v4 } = require("uuid");
const axios = require("axios");
/* 
    @desc Create QuestionLevel
    @route Get /api/v1/saveData/createQuestionLevel
    @access private
**/
exports.createQuestionLevel = catchAsync(async (req, res, next) => {
  let questionLevel;

  axios
    .get(`http://localhost:3001/api/v1/getdata/getAllQuestionLevel`)
    .then(async function (response) {
      questionLevel = response.data.data.result;
      await Promise.all(
        questionLevel.map(async (el) => {
          await QuestionLevel.create({
            levelId: el.LevelID,
            levelName: el.LevelName,
            isActive: el.isActive,
          });
        })
      );

      res.status(200).json({
        status: "success",
        data: { questionLevel },
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return next(new AppError("Client Information not found", 404));
    })
    .then(function () {
      // always executed
    });

  //let msgContact = await MessageContact.create({});
});

/* 
    @desc Create Course
    @route Get /api/v1/saveData/createCourse
    @access private
**/
exports.createCourse = catchAsync(async (req, res, next) => {
  let course;

  axios
    .get(`http://localhost:3001/api/v1/getdata/getAllCourse`)
    .then(async function (response) {
      course = response.data.data.result;
      await Promise.all(
        course.map(async (el) => {
          await Course.create({
            courseId: el.CourseID,
            courseName: el.CourseName,
            isActive: el.isActive ? true : false,
          });
        })
      );

      res.status(200).json({
        status: "success",
        data: { course },
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return next(new AppError("Client Information not found", 404));
    })
    .then(function () {
      // always executed
    });

  //let msgContact = await MessageContact.create({});
});

/* 
    @desc Create Subject
    @route Get /api/v1/saveData/createSubject
    @access private
**/
exports.createSubject = catchAsync(async (req, res, next) => {
  let subject;

  axios
    .get(`http://localhost:3001/api/v1/getdata/getAllSubject`)
    .then(async function (response) {
      subject = response.data.data.result;

      await Promise.all(
        subject.map(async (el) => {
          await Subject.create({
            subjectId: el.SubjectID,
            subjectName: el.SubjectName,
            isActive: el.isActive,
          });
        })
      );

      res.status(200).json({
        status: "success",
        data: { subject },
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return next(new AppError("Client Information not found", 404));
    })
    .then(function () {
      // always executed
    });

  //let msgContact = await MessageContact.create({});
});

/* 
    @desc Create Subject
    @route Get /api/v1/saveData/createEntranceQuestion
    @access private
**/
exports.createEntranceQuestion = catchAsync(async (req, res, next) => {
  let entranceQuestion;
  if (!req.query.offset) {
    return next(new AppError(`Problem with Offset`, 500));
  }
  axios
    .get(
      `http://localhost:3001/api/v1/getdata/getAllEntranceQuestion?offset=${req.query.offset}`
    )
    .then(async function (response) {
      entranceQuestion = response.data.data.result;
      let bulkArray = [];
      await Promise.all(
        entranceQuestion.map(async (el) => {
          let obj = {};
          obj = {
            questionId: el.QuestionID,
            levelId: el.LevelID,
            courseId: el.CourseID,
            subjectId: el.SubjectID,
            chapterId: el.ChapterId,
            weight: el.Weight,
            question: el.Question,
            option1: el.Option1,
            option2: el.Option2,
            option3: el.Option3,
            option4: el.Option4,
            correctAnswer: el.CorrectAnswer,
            correctOption: el.CorrectOption,
            addHint: el.AddHint,
            uploadFile: el.UploadFile,
            createdDate: el.CreatedDate,
            modifiedDate: el.ModifiedDate,
            isActive: el.isActive,
            remarks: el.Remarks,
            isExamReserved: el.isActive,
            isApiUpload: el.isActive,
          };
          bulkArray.push(obj);
        })
      );

      EntranceQuestion.bulkCreate(bulkArray).then(() =>
        console.log("EntranceQuestion data have been saved")
      );

      res.status(200).json({
        status: "success",
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return next(new AppError(error, 404));
    })
    .then(function () {
      // always executed
    });

  //let msgContact = await MessageContact.create({});
});

/* 
    @desc Create Subject
    @route Get /api/v1/saveData/createChapter
    @access private
**/
exports.createChapter = catchAsync(async (req, res, next) => {
  let chapter;

  axios
    .get(`http://localhost:3001/api/v1/getdata/getAllChapter`)
    .then(async function (response) {
      chapter = response.data.data.result;

      await Promise.all(
        chapter.map(async (el) => {
          await Chapter.create({
            chapterId: el.ChapterId,
            chapterName: el.ChapterName,
            isActive: el.IsActive,
            subjectId: el.SubjectId,
            parentId: el.ParentId,
          });
        })
      );

      res.status(200).json({
        status: "success",
        data: { chapter },
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return next(new AppError("Client Information not found", 404));
    })
    .then(function () {
      // always executed
    });

  //let msgContact = await MessageContact.create({});
});
