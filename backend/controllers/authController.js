const crypto = require("crypto");

const { promisify } = require("util");

const jwt = require("jsonwebtoken");

const User = require("./../models/userModel");

const AppError = require("./../utils/appError");

const sendEmail = require("./../utils/email");

const catchAsync = require("./../utils/catchAsync");

const College = require("./../models/collegeModel");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  let newUser;

  // Check if the role is 'student' and a valid collegeName is provided
  if (req.body.role === "student" && req.body.collegeName) {
    // Find the college by name
    const college = await College.findOne({ name: req.body.collegeName });

    // If the college is found, create a new user with the college ID
    if (college) {
      newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
        college: college._id, // Save the college ID in the user document
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Invalid college name",
      });
    }
  } else {
    // If the role is not 'student' or no collegeName is provided, create a user without a college
    newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });
  }

  // Implementing jwt
  const token = signToken(newUser._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please provide an email and the password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password ", 401));
  }

  console.log(user);

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
exports.protect = catchAsync(async (req, res, next) => {
  //1) getting the token and check its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // console.log(token);

  if (!token) {
    return next(
      new AppError("you are not logged in !! please login to get access", 401)
    );
  }

  //2) verification token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  //3)check if user still exists
  const freshUser = await User.findById(decoded.id);

  // exports.collegeid = freshUser.college;
  if (!freshUser) {
    return next(
      new AppError("THE TOKEN BELONGING TO THE USER DOES NO LONGER EXISTS", 401)
    );
  }

  //the next is basically it will grant access to the protected route
  req.user = freshUser;
  // console.log(req.user.college._id);
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //req.user we specified i.e.  we saved the logined user in tht above as req.user=fresh user
    //////this is very important ***************************
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "Sorry you do not have permission to perform this action !!!",
          403
        )
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    console.log(err); // Add this line to log the error
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1 getting user based on the token

  //encryption of reset token

  const hashToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2) if there is no user or there is an invalid token then

  if (!user) {
    return next(new AppError("success ", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  //3) we will go in user model to change the password chagedat property and for that we will use a middleware

  //4)now login in the user

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
