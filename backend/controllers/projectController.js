const Project = require("./../models/projectModel");

const APIFeatures = require("./../utils/APIFeatures");

const collegeid = require("./../controllers/authController");
const College = require("../models/collegeModel");

// const collegeid = require("./../controllers/authController");
//function

const catchAsync = require("./../utils/catchAsync");

exports.topprojects = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-likes";
  next();
};

exports.home = (req, res, next) => {
  req.query.fields =
    "project_title,college_name,project_description,likes,image_url, domain";
  next();
};

exports.getAllProjects = async (req, res) => {
  try {
    const features = new APIFeatures(Project.find(), req.query)
      .sort()
      .limitFields()
      .paginate()
      .filter();
    const projects = await features.query;
    res.status(200).json({
      status: "success",
      results: projects.length,
      data: { projects },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getsingleproject = async (req, res) => {
  try {
    //if you want to esarch by id use the following query
    const pr = await Project.findById(req.params.id);

    //if not yoou want to search by name use the following query
    // const projectTitle = req.params.project_title; // Assuming you get the project title from the request parameters

    // const pr = await Project.findOne({ project_title: projectTitle });
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
exports.createProject = catchAsync(async (req, res) => {
  // Find the college ID based on the provided college_name
  const college = await College.findOne({ name: req.body.college_name });

  const newproject = await Project.create({
    project_title: req.body.project_title,
    domain: req.body.domain,
    college_name: req.body.college_name,
    college: college._id, // Save the college ID
    project_description: req.body.project_description,
    numberofstudents: req.body.numberofstudents,
    made_by_students: req.body.made_by_students,
    tech_stack: req.body.tech_stack,
    video_url: req.body.video_url,
    image_url: req.body.image_url,
    leader: req.body.leader,
  });

  res.status(201).json({
    status: "success",
    data: {
      project: newproject,
    },
  });
});

exports.topprojects = catchAsync(async (req, res) => {
  const top = await Project.aggregate([
    {
      $lookup: {
        from: "colleges",
        localField: "college",
        foreignField: "_id",
        as: "collegeInfo",
      },
    },
    {
      $group: {
        _id: "$_id",
        project_title: { $first: "$project_title" },
        image: { $first: "$image_url" },
        description: { $first: "$project_description" },
        totalLikes: { $sum: "$likes" },
        collegeInfo: { $first: "$collegeInfo.name" },
      },
    },
    {
      $sort: { totalLikes: -1 },
    },
    {
      $limit: 1,
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      topProject: top[0],
    },
  });
});

exports.collegeInfo = catchAsync(async (req, res) => {
  const stats = await Project.aggregate([
    {
      $group: {
        _id: "$college_name",
        collegeid: { $first: "$college" },
        averagelikes: { $avg: "$likes" },
        totalprojects: { $sum: 1 },
        softwareprojects: {
          $sum: {
            $cond: { if: { $eq: ["$domain", "software"] }, then: 1, else: 0 },
          },
        },
        hardwareprojects: {
          $sum: {
            $cond: { if: { $eq: ["$domain", "hardware"] }, then: 1, else: 0 },
          },
        },
        collegeInfo: { $addToSet: "$collegeInfo" }, // Include entire college document
      },
    },
    {
      $lookup: {
        from: "colleges",
        localField: "collegeid",
        foreignField: "_id",
        as: "collegeInfo",
      },
    },
    {
      $unwind: "$collegeInfo",
    },
  ]);

  res.status(200).json({
    status: "success",
    College: {
      stats,
    },
  });
});

exports.searchProject = async (req, res) => {
  //console.warn(await req.params.key);
  let result = await Project.find({
    $or: [
      { project_title: { $regex: req.params.key } },
      { domain: { $regex: req.params.key } },
      { college_name: { $regex: req.params.key } },
      { project_description: { $regex: req.params.key } },
      { made_by_students: { $elemMatch: { $regex: req.params.key } } },
    ],
  });
  res.send(result);
};

exports.likeProject = async (req, res) => {
  console.warn(req);
  let result = await Project.updateOne(
    { _id: req.params.id },
    {
      $inc: { likes: 1 },
    }
  );
  res.send(result);
  //console.warn(result);
};

exports.dislikeProject = async (req, res) => {
  console.warn(req);
  let result = await Project.updateOne(
    { _id: req.params.id },
    {
      $inc: { likes: -1 },
    }
  );
  res.send(result);
  //console.warn(result);
};

exports.deleteProject = catchAsync(async (req, res, next) => {
  const doc = await Project.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError("No document found with that id", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
