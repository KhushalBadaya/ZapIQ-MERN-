import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctQuestions: {
      type: Number,
      required: true,
    },
    incorrectQuestions: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    score:{
      type:Number,
      required:true,
    },
    isPassed: { type: Boolean, default: false },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        selectedOption: {
          type: String, // what user picked
        },
        isCorrect: {
          type: Boolean, // true or false
        },
      },
    ],
    timeTaken: {
      type: Number, // in seconds
      default: 0,
    },
    isPassed: {
      type: Boolean,
      default: false, // true if percentage >= 50
    },
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);