const express = require("express");
const app = express();
const api = require("./routes/api");
const sequelize = require("./database/config/database");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Static folder for serving uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Use api routes
app.use("/api", api);

const PORT = process.env.PORT;

// Sync Sequelize models with the database
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is running on port https://localhost:${PORT}`
      );
    });
  })
  .catch((err) => console.error("Unable to sync database:", err));
