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
    shareCode: {
      type: String,
      unique: true,
      sparse: true, // allows multiple documents to have no shareCode
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    timeLimit: {
      type: Number,
      default: 30,
    },
    description: {
      type: String,
      trim: true,
    },
    passingScore: {
      type: Number,
      default: 70,
    },
    randomizeQuestions: {
      type: Boolean,
      default: false,
    },
    immediateResults: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model("Quiz", Quiz);
