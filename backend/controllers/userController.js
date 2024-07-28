const User = require("./../models/userModel");

const catchAsync = require("./../utils/catchAsync");

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    status: "success",
    results: user.length,
    data: {
      user,
    },
  });
};
const getOne = (Model, popOptions) => async (req, res, next) => {
  let query = Model.findById(req.params.id);
  if (popOptions) query = query.populate(popOptions);
  const doc = await query;

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
};

exports.getUser = getOne(User);
exports.getsuser = async (req, res) => {
  try {
    //if not yoou want to search by name use the following query
    const usertitle = req.params.name; // Assuming you get the project title from the request parameters

    const pr = await User.findOne({ name: usertitle }).populate("projects");
    res.status(200).json({
      status: "success",
      data: { pr },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.deleteme = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
