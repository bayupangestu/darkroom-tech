const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authN(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw {
        name: "Invalid Token",
        message: "Please login first",
      };
    }
    const payload = verifyToken(access_token);
    const foundUser = await User.findOne({
      where: {
        id: payload.id,
        email: payload.email,
      },
    });
    if (!foundUser) {
      throw {
        name: "Unauthorized",
        message: "Please login first",
      };
    }
    req.userLogin = foundUser;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authN;
