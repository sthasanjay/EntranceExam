const { User, UserSubscription } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("./../utils/email");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const { Op } = require("sequelize");
const { v4 } = require("uuid");
const path = require("path");

//Generate a token using JWT
//@return token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//Return token response
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const   cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  user.id = undefined;
  user.passwordConfirm = undefined;
  user.passwordChangedAt = undefined;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.lastLogin = undefined;

  res.status(statusCode).json({
    status: "success",
    data: {
      token,
      user,
    },
  });
};

/*
    @desc POST SignUp
    @route POST /api/v1/users/signup
    @access private
**/

exports.signUp = catchAsync(async (req, res, next) => {
  let user;
  // check whether the file exist or not
  if (!req.files || Object.keys(req.files).length === 0) {
    user = await User.create({
      ...req.body,
    });

    createSendToken(user, 201, res);
  } else {
    let file = req.files.file;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new AppError("Please upload an image file", 400));
    }

    // Create custom filename
    file.name = `user_${v4()}${path.parse(file.name).ext}`;

    file.mv(
      `${process.env.USER_PROFILE_FILE_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new AppError(`Problem with file upload`, 500));
        }

        user = await User.create({
          ...req.body,
          profileImage: file.name,
        });

        createSendToken(user, 201, res);
      }
    );
  }
});

/* 
    @desc Post Login
    @route POST /api/v1/users/login
    @access private
**/
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide e-mail and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({
    where: { email },
    include: {
      model: UserSubscription,
      attributes: ["scopeCategoryId", "isFree"],
    },
  });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //update last login
  user.lastLogin = Date.now();
  await user.save();

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
};

/* 
    @desc Protect middlware route
    @route *.*
    @access private
**/
exports.adminProtect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
  const currentUser = await User.findOne({
    where: {
      id: decoded.id,
      isActive: true,
    },
    include: {
      model: UserSubscription,
      attributes: ["isFree"],
    },
  });

  if (!currentUser) {
    return next(
      new AppError("This user account is deactivated or doesnot exist.", 404)
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 403)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  console.log("from here", req.user.UserSubscriptions);
  next();
});

/* 
    @desc Protect middlware route
    @route *.*
    @access private
**/
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
  const currentUser = await User.findOne({
    where: {
      id: decoded.id,
      isActive: true,
    },
    include: {
      model: UserSubscription,
      attributes: ["isFree"],
    },
  });

  if (!currentUser) {
    return next(
      new AppError("This user account is deactivated or doesnot exist.", 404)
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 403)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  console.log("from here", req.user.UserSubscriptions);
  next();
});

/* 
    @desc Protect middlware route
    @route *.*
    @access private
**/
exports.checkCourseAccess = catchAsync(async (req, res, next) => {
  if (!req.user) {
    new AppError("You are not logged in! Please log in to get access.", 401);
  }
});

exports.getAUser = catchAsync(async (req, res, next) => {
  const data = await User.findByPk(req.params.id);
  res.status(200).json({
    status: "success",
    data,
  });
});

/* 
    @desc Send password reset mail
    @route /api/v1/users/forgotPassword
    @access private
**/
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on provided email
  const user = await User.findOne({
    where: {
      email: req.body.email,
      isActive: true,
    },
  });

  //check whether user exist or not
  if (!user) {
    return next(
      new AppError(`Either the account is deactivated or doesn't exist`, 411)
    );
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save();

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  // const resetURL = `${process.env.HOME_URL}/change-password/${resetToken}`;

  //Get the password reset template
  // const template = await EmailTemplate.findOne({ type: 'passwordreset' });

  //check whether template exist or not
  // if (!template) {
  //   return next(new AppError('Internal Server Error', 500));
  // }

  //Inject data in the required template
  // let finalData = template.description.replace('{link}', resetURL);
  // let emailTitle = template.emailTitle;
  //Render ejs template
  // const message = await ejs.renderFile(
  //   `${__dirname}/../views/emailTemplate/passwordResetTemplate.ejs`,
  //   {
  //     finalData,
  //     emailTitle,
  //     resetURL,
  //   }
  // );
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 30 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

/* 
    @desc reset password using token
    @route /api/v1/users/resetPassword/:token
    @access private
**/
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { [Op.gt]: Date.now() },
    },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError("Password do not match with confirm password!"));
  }
  // 3) If so, update password
  // Hash the password with cost of 12
  user.password = await bcrypt.hash(req.body.password, 12);
  // 4) Update changedPasswordAt property for the user
  user.passwordChangedAt = Date.now() - 1000;
  // 5)Delete other field
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Your password has been changed successfully.",
  });
});

/* 
    @desc Update user password
    @route /api/v1/user/updatemypassword
    @access private
**/
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findByPk(req.user.id);

  // 2) Check if provided current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError("Password do not match with confirm password!"));
  }

  // 3) If so, update password
  // Hash the password with cost of 12
  user.password = await bcrypt.hash(req.body.password, 12);
  user.passwordChangedAt = Date.now() - 1000;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

/*  @desc check for role authorization
    @route *.*
    @access private
**/
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['player'].role='user'
    if (req.user.role == "admin") {
      next();
    } else {
      if (!req.query.courseId) {
        new AppError("Need to Specify which course is Selected!", 401);
      }
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError("You do not have permission to perform this action", 403)
        );
      }
      next();
    }
  };
};

/*  @desc check whether user is deactivated
    @route *.*
    @access private
**/
exports.checkDeactivateInLogin = catchAsync(async (req, res, next) => {
  // 1) find user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  // 2) Check if user is Active
  if (!user || !user.isActive) {
    return next(
      new AppError(
        "Either the account has been deactivated or does not exist.",
        403
      )
    );
  }
  next();
});

/* 
    @desc check validation of resetpassword token
    @route GET /api/v1/user/checkResetToken/:token
    @access private
**/
exports.checkResetToken = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { [Op.gt]: Date.now() },
    },
  });
  let tokenIsValid = true;

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    tokenIsValid = false;
    return next(new AppError("Token is invalid or has expired", 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      tokenIsValid,
    },
  });
});
