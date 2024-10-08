import mongoose from "mongoose";
import app from "./app";
import config from "./app/config/config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
      console.log("Database Connected !! 😊😊");
    });
  } catch (error) {
    console.log(error);
  }
}
main();
