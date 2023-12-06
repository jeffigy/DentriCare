const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//* get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

//* create new user
const createNewUser = asyncHandler(async (req, res) => {
  const { fname, lname, email, password, roles } = req.body;

  if (
    !fname ||
    !lname ||
    !email ||
    !password ||
    !Array.isArray(roles) ||
    !roles.length
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const userObj = {
    fname,
    lname,
    email,
    password: hashedPwd,
    roles,
  };

  const user = await User.create(userObj);
  if (user) {
    res.status(201).json({
      message: `New user with email ${email} created`,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

//* update User
const updateUser = asyncHandler(async (req, res) => {
  const { id, fname, lname, email, password, roles, active } = req.body;

  if (
    !fname ||
    !lname ||
    !email ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const duplicate = await User.findOne({ email }).lean().exec();
  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  user.fname = fname;
  user.lname = lname;
  user.email = email;
  user.roles = roles;
  user.active = active;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  const updatedUser = await user.save();
  res.json({ message: `User with email ${updatedUser.email} was updated` });
});

//* delete User
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "user ID is required" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const result = await user.deleteOne();
  console.log(result);
  const reply = `User deleted: ${result.deletedCount}`;
  res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
