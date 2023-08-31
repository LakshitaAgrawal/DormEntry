import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI);
    console.log(`connected to mongodb database`);
  } catch (error) {
    console.log(`error in mongodb ${error}`);
  }
};

export default connectDB;
