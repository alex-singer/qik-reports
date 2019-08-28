const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const userSchema = new Schema (
  {
    name: {
      first: {
        type: String,
        trim: true
      },
      last: {
        type: String,
        trim: true
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    reports: [{ type: Schema.Types.ObjectId, ref: "Report" }],
  },
  {
    timestamps: true
  }
);

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function(next) {
  let user = this;

  bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(error => {
      console.log(`Error in hashing password: ${error.message}`);
      next(error);
    });
});

userSchema.methods.passwordComparison = function(inputPassword) {
  let user = this;
  return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("User", userSchema);
