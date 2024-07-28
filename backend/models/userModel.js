const crypto = require("crypto");

const mongoose = require("mongoose");

const validator = require("validator");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name of the user is compulsory"],
      trim: true,
    },

    college: {
      type: mongoose.Schema.ObjectId,
      ref: "College",
    },
    // projects: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Project",
    //   },
    // ],

    email: {
      type: String,
      required: [true, "An email is must"],
      unique: true,
      lowercase: true, //this will just transform email to lower case
      //this is from the validator npm
      validate: [validator.isEmail, "please provide a valid email"],
    },

    photo: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "student"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "A password is must"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "please confirm your password"],
      minlength: 8,
      //lescture number 127
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "password are no the same",
      },
      select: false,
    },
    active: {
      default: true,
      select: false,
      type: Boolean,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "college",
    select: "-__v",
  });
  next();
});

userSchema.virtual("projects", {
  ref: "Project",
  foreignField: "leader",
  localField: "name",
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;

  // //this was the main part which we have to do that was not taught in the lecture so keep this in mind very important **********************************
  // this.passwordChangedAt = Date.now();

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  //this point to the current query or the cureent document we are working on in this case it is user

  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    console.log("Password was changed at:", this.passwordChangedAt);
    console.log("Password was changed at:", changedTimestamp);
    console.log("JWT Timestamp:", JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  //false means password is not changed
  return false;
};
/////

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  //this return is then use in the authcontroller
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
