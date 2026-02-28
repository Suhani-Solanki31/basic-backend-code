import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";
import app from "./app.js";
dotenv.config();

let StartServer = async () => {
  try {
    await connectDb();

    app.listen(process.env.PORT, () => {
      console.log("server is running");
    });

  } catch (error) {
    console.log("error in server start : ",error);
    process.exit(1);
  }
};

StartServer();
