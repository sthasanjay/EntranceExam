const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const {
  ExpertProfile,
  DiscussionReply,
  User,
  ExpertSubject,
  Subject,
} = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { v4 } = require("uuid");
const apiFeature = require("../utils/apiFeaturesSequelize");
const { paginationInfo } = require("../utils/frontEndPagination");
/* 
    @desc Create ExpertProfile
    @route POST /api/v1/admin/expertProfile/create
    @access private
**/
exports.adminCreateExpertProfile = catchAsync(async (req, res, next) => {
  let expertProfile, newUser;
  console.log("here>>>>>", req.body);

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError(`password and confirmPassword are not same`, 402));
  }
  if (!req.body.subjects || !req.body.subjects.length) {
    return next(new AppError(`subjects is required`, 400));
  }
  let subjects = req.body.subjects;

  let subjectModelArray = [];

  if (!req.files || Object.keys(req.files).length === 0) {
    newUser = await User.create({ ...req.body, role: "expert" });
    expertProfile = await ExpertProfile.create({
      ...req.body,
      userId: newUser.id,
    });

    Promise.all(
      subjects.map(async (el) => {
        let subject = {};
        subject.expertId = expertProfile.id;
        subject.subjectId = el;
        subjectModelArray.push(subject);
      })
    );

    await ExpertSubject.bulkCreate(subjectModelArray);

    // send response
    res.status(201).json({
      status: "success",
      data: { expertProfile },
    });
  } else {
    newUser = await User.create({ ...req.body, role: "expert" });
    let file = req.files.file;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new AppError("Please upload an image file", 400));
    }

    // Create custom filename
    file.name = `expertProfile_${v4()}${path.parse(file.name).ext}`;
    file.mv(
      `${process.env.EXPERTPROFILE_FILE_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new AppError(`Problem with file upload`, 500));
        }

        expertProfile = await ExpertProfile.create({
          ...req.body,
          userId: newUser.id,
          profileImage: file.name,
        });

        Promise.all(
          subjects.map(async (el) => {
            let subject = {};
            subject.expertId = expertProfile.id;
            subject.subjectId = el;
            subjectModelArray.push(subject);
          })
        );

        await ExpertSubject.bulkCreate(subjectModelArray);

        res.status(200).json({
          status: "success",
          data: { expertProfile },
        });
      }
    );
  }
});

/* 
    @desc  Edit  ExpertProfile
    @route PUT /api/v1/admin/expertProfile/edit/:id
    @access private
**/
exports.adminEditExpertProfile = catchAsync(async (req, res, next) => {
  let updatedDoc;
  if (req.body.password) {
    return next(new AppError(`Invalid Action`, 500));
  }
  const expertProfile = await ExpertProfile.findOne({
    where: { id: req.params.id },
  });
  // check whether the athlete exist or not
  if (!expertProfile) {
    return next(new AppError("Something Went wrong", 500));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    updatedDoc = await ExpertProfile.update(req.body, {
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
  } else {
    let file = req.files.file;
    // Create custom filename
    file.name = `expertProfile_${v4()}${path.parse(file.name).ext}`;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new AppError("Please upload an image file", 400));
    }
    //Delete old pic
    if (expertProfile.profileImage) {
      const unlinkAsync = promisify(fs.unlink);
      await unlinkAsync(`./public/uploads/${expertProfile.profileImage}`);
    }

    file.mv(
      `${process.env.EXPERTPROFILE_FILE_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new AppError(`Problem with file upload`, 500));
        }

        updatedDoc = await ExpertProfile.update(
          { ...req.body, profileImage: file.name },
          { where: { id: req.user.id } }
        );

        res.status(200).json({
          status: "success",
          data: { updatedDoc },
        });
      }
    );
  }
});

/* 
    @desc Get Expert list
    @route /api/v1/admin/expertProfile/getAll
    @access private
**/
exports.adminGetAllExpertProfile = catchAsync(async (req, res, next) => {
  let subjectFilter = {};
  if (req.query.subjectId) {
    subjectFilter = {
      subjectId: req.query.subjectId,
    };
    delete req.query.subjectId;
  }
  let feature = apiFeature(req.query);
  let result = await ExpertProfile.findAll({
    where: { ...feature.queryObj },
    offset: feature.offset,
    limit: feature.limit,
    order: [feature.order],
    attributes: feature.attributes,
    include: [
      {
        model: ExpertSubject,
        attributes: ["subjectId"],
        include: [
          {
            model: Subject,
            attributes: ["subjectName"],
            where: { ...subjectFilter },
          },
        ],
      },
    ],
  });
  let total = await ExpertProfile.count({
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
    @desc Get one ExpertProfile
    @route GET /api/v1/admin/expertProfile/getOne/:id
    @access private
**/
exports.adminGetOneExpertProfile = catchAsync(async (req, res, next) => {
  const expertProfile = await ExpertProfile.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: ExpertSubject,
        attributes: ["subjectId"],
        include: [
          {
            model: Subject,
            attributes: ["subjectName"],
          },
        ],
      },
    ],
  });
  // check whether the expertProfile exist or not
  if (!expertProfile) return next(new AppError("expertProfile not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      expertProfile,
    },
  });
});
