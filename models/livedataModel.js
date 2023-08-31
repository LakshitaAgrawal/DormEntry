import mongoose from "mongoose";

const liveSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'student',
      required: true
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['IN', 'OUT'],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("livedata", liveSchema);
