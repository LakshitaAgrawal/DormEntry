import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rollno: {
      type: String,
      required: true,
      unique: true,
    },
    room: {
      type: Number,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    phoneno: {
      type: Number,
      required: true,
    },
    parentphone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("student", studentSchema);
