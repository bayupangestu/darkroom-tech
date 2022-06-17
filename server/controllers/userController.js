const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, profilePict, bio, specification } = req.body;
      const user = await User.create({
        username,
        email,
        password,
        profilePict,
        bio,
        specification,
      });
      res.status(201).json({
        message: "User created successfully",
        user,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw {
          name: "Invalid email / password",
          message: "Email is required",
        };
      }
      if (!password) {
        throw {
          name: "Invalid email / password",
          message: "Password is required",
        };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw {
          name: "Invalid email / password",
          message: "Email is not registered",
        };
      }
      const isMatch = compare(password, user.password);
      if (!isMatch) {
        throw {
          name: "Unauthorized",
          message: "Invalid email / password",
        };
      }
      const payload = {
        id: user.id,
        email: user.email,
      };
      const token = generateToken(payload);
      const dataUser = {
        id_token: token,
        id: user.id,
        username: user.username,
        email: user.email,
      };
      res.status(200).json({
        message: "User logged in successfully",
        dataUser,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = UserController;
