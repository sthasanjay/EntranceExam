const dotenv = require("dotenv");
const { sequelize } = require("./models");
const colors = require("colors");
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err);
  console.log(err.name, err.message);
  process.exit(1);
});

 dotenv.config({ path: "./config.env" });
const app = require("./app");


const port = process.env.PORT || 8000;
const server = app.listen(port, async () => {
  console.log(`App running on port ${port}...`.yellow.bold);
  // connectDB
  try {
    await sequelize.authenticate();
    console.log(colors.blue("Connection has been established successfully."));
    
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log("err", err);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
