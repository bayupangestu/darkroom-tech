const router = require("express").Router();

const postRoutes = require("./postRouter");
const userRoutes = require("./userRouter");
const imageRoutes = require("./imageRouter");
const orderRoutes = require("./orderRouter");
const messageRoutes = require("./messageRouter");
const userController = require("../controllers/userController");
const authN = require("../middlewares/authN");

router.post("/register", userController.register);
router.post("/login", userController.login);
module.exports = router;
