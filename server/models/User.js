const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: string,
    required: true,
  },
  lname: {
    type: string,
    required: true,
  },
  username: {
    type: string,
    required: true,
  },
  password: {
    type: string,
    required: true,
  },
  roles: [
    {
      type: string,
      default: "Employee",
    },
  ],
  active: {
    type: boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);
