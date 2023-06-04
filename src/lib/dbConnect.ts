import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('Invalid/Missing environment variable: "MONGO_URI"');
    }
    const uri = process.env.MONGO_URI;
    const options = {};
    await mongoose.connect(uri || "", options);
    console.log("connection successfull");
  } catch (error) {
    console.log(error);
  }
};
