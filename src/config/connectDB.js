require("dotenv").config();

const mongoose = require("mongoose");
import bluebird from "bluebird";

/**
 * Connect to MongoDB
 */
let connectDB = () => {
  mongoose.Promise = bluebird;
  try {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      })
      .then((r) => console.log("Connect mongodb success!"))
      .catch((reason) => console.error("Error connecting to mongo", reason));

    mongoose.connection.on("connected", () => {
      console.log("Connected to mongo instance");
    });
    mongoose.connection.on("error", (err) => {
      console.error("Error connecting to mongo", err);
    });
  } catch (error) {
    console.error("Error connecting to mongo", error);
    throw error;
  }
};
module.exports = connectDB;
