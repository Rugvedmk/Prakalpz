const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "college naME MUST"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    email: {
      type: String,
      required: [true, "An email is must"],
      unique: true,
      lowercase: true,
      // validate: [validator.isEmail, "Please provide a valid email"],
    },
    SPOC: {
      type: String,
      required: [true, "For every college, the SPOC is compulsory"],
    },
    logo: { type: String },
    banner : { type : String },
    aboutus : { type : String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

collegeSchema.virtual("projects", {
  ref: "Project",
  foreignField: "college",
  localField: "_id",
});

collegeSchema.virtual("students", {
  ref: "User",
  foreignField: "college",
  localField: "_id",
});

const College = mongoose.model("College", collegeSchema);
module.exports = College;
