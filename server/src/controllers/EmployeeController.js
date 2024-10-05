const Employee = require("../models/employee");
const path = require("path");
const fs = require("fs");
const { removeBackground } = require("./RemoveBackground");

exports.index = async (req, res) => {
  try {
    const employee = await Employee.findAll({
      order: [["id", "DESC"]],
    });
    
    return res.status(200).json({
      data: employee[0],
      message: "Respons OK!",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};

exports.removeBgImage = async (req, res) => {
  try {
    console.log(req.file)
    let imagePath;
    let outputFileName;
    let outputPath;

    if (req.file) {
      imagePath = path.join(__dirname, "../../uploads", req.file.filename);
      outputFileName = `/uploads/processed-${path.basename(imagePath)}.png`;
      outputPath = path.join(
        __dirname,
        "../../uploads",
        `processed-${req.file.filename}.png`
      );

      const fileBlob = await fs.openAsBlob(imagePath);
      const rbgResultData = await removeBackground(fileBlob);

      fs.writeFileSync(outputPath, Buffer.from(rbgResultData));
      // Delete the original file after processing
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting original file:", err);
      });
    } else {
      outputFileName = null;
    }

    const employee = await Employee.create({
      imagePath: outputFileName,
    });

    return res.status(201).json({
      data: employee,
      message: "Remove background image success!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error!",
    });
  }
};
