const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const {
  getUserService,
  updateUserService,
  getUserByEmailService,
  createUserService,
  getTotalUserCountService
} = require("../services/user.service");

exports.getUsers = async (req, res) => {
  try {
    const page = +req.query?.page;
    const size = +req.query?.size;
    const filter = req.query?.filter;

    const data = await getUserService(page, size, filter);

    res.status(200).json({
      status: "success",
      data: data.result,
      total: data.total,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const email = req?.body?.email;

    const isExist = await User.findOne({ email });

    if (!isExist) {
      const newUser = await createUserService(req.body);
      const token = jwt.sign(email, process.env.SECRET_KEY);
      // res.send({ token });
      res.status(200).json({
        status: "success",
        message: "data inserted successfully!",
        token: token,
      });
    } else {
      const token = jwt.sign(email, process.env.SECRET_KEY);
      // res.send({ token });
      res.status(200).json({
        status: "success",
        message: "data inserted successfully!",
        token: token,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.getUserByQuery = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await getUserByEmailService(email);
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't find user",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await updateUserService(id, req.body);

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "Couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. Couldn't update user ",
      error: error.message,
    });
  }
};

// New controller function to get total user count
exports.getTotalUserCount = async (req, res) => {
  try {
    const total = await getTotalUserCountService();
    res.status(200).json({
      status: "success",
      total: total,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};