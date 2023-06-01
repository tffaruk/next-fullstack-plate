import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("connection successfull");
  } catch (error) {
    console.log(error);
  }
};
