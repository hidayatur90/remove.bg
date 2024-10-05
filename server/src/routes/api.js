const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/EmployeeController");

const upload = require("../middleware/upload");

router.get("/employee", EmployeeController.index);
router.post(
  "/employee",
  upload.single("image"),
  EmployeeController.removeBgImage
);

module.exports = router;
