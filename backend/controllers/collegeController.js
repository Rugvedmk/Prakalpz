const College = require("../models/collegeModel");
const APIFeatures = require("../utils/APIFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getAllColleges = catchAsync(async (req, res) => {
  const features = new APIFeatures(College.find(), req.query)
    .sort()
    .limitFields()
    .paginate();

  const colleges = await features.query;

  res.status(200).json({
    status: "success",
    results: colleges.length,
    data: { colleges },
  });
});

exports.updateCollege = catchAsync(async (req, res, next) => {
  const college = await College.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!college) {
    return next(new AppError("no college found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      college,
    },
  });
});

exports.searchColleges = async (req, res) => {
  try {
    const colleges = await College.find({
      name: { $regex: `^${req.params.partialName}`, $options: "i" },
    });

    res.status(200).json({
      status: "success",
      data: { colleges },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getsingleCollege = async (req, res) => {
  try {
    const pr = await College.findById(req.params.id)
      .populate("projects")
      .populate("students");
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
exports.createCollege = catchAsync(async (req, res) => {
  const newCollege = await College.create(req.body);

  res.status(201).json({
    status: "success",
    data: { college: newCollege },
  });
});
