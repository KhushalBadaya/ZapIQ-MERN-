// import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema({
//   question: {
//     type: String,
//     required: true,
//   },
//   options: {
//     type: [String],  // Array of answer choices e.g. ["Paris", "London", "Rome", "Berlin"]
//     required: true,
//     validate: {
//       validator: (arr) => arr.length >= 2 && arr.length <= 5,
//       message: "A question must have between 2 and 5 options",
//     },
//   },
//   correctAnswer: {
//     type: String,
//     required: true,
//   },
// });

// const Question = mongoose.model("Question", questionSchema);
// export default Question;

import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer1: { type: String, required: true },
  answer2: { type: String, required: true },
  answer3: { type: String },
  answer4: { type: String },

  correctAnswer: {
    type: String,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // links to your User model
  },
}, { timestamps: true });

export default mongoose.model("Question", questionSchema);