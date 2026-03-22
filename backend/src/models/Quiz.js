import mongoose from "mongoose";

const Quiz = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isAIgenerated: {
      type: Boolean,
      default: false,
    },
    topic: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model("Quiz", Quiz);
