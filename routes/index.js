const router = require("express").Router();
const userRoutes = require("./userRoutes");
const reportRoutes = require("./reportRoutes");
const errorRoutes = require("./errorRoutes");
const homeRoutes = require("./homeRoutes");

router.use("/users", userRoutes);
router.use("/reports", reportRoutes);
router.use("/", homeRoutes);
//router.use("/", errorRoutes);

module.exports = router;
