const mongoose = require("mongoose");
const slugify = require("slugify");
const projectSchema = new mongoose.Schema(
  {
    project_title: {
      type: String,
      required: [true, "Project title must be present"],
      unique: true,
      minlength: 8,
    },
    domain: String,
    college_name: String,

    //this are the refrences part for college and the user
    college: {
      type: mongoose.Schema.ObjectId,
      ref: "College",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    numberofstudents: Number,
    leader: String,
    made_by_students: [String],
    project_description: String,
    tech_stack: [String],
    video_url: String,
    likes: { type: Number, default: 0 },
    image_url: String,
    createdAt: { type: Date, default: Date.now() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
  //virtual property very important
);

projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: "college",
    select: "-__v",
  }).populate({
    path: "user",
    select: "-__v",
  });

  next(); // Call next to move to the next middleware in the stack
});
projectSchema.pre("save", function (next) {
  this.slug = slugify(this.project_title, { lower: true });
  next();
});
//in project model itself

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
