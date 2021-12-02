import * as mongoose from "mongoose";
import { MONGO_URI } from "../config/keys";

mongoose.connect(MONGO_URI, { useNewUrlParser: true }, (err: any) => {
  if (err) console.log("Error on MongoDB connection", err);
  else console.log("Connected to MongoDB");
});

export default mongoose;
