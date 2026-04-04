import Quiz from "../models/Quiz.js";
import Result from "../models/Result.js";

export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("questions")
      .populate("createdBy", "name email");

    if (!quiz)
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    console.log("Error in getting quiz", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getQuizByShareCode = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ shareCode: req.params.shareCode })
      .populate("questions")
      .populate("createdBy", "name email");
    if (!quiz)
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    console.log("Error in getting quiz", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//rewrite this code on your own 
export const submit = async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;
    const userId = req.user._id;
    const quizId = req.params.id;
    console.log("USER ID:", userId);
    console.log("QUIZ ID:", quizId);


    if (!answers || answers.length === 0)
      return res.status(400).json({ message: "Please provide the answer" });
console.log("PAST ANSWERS CHECK");

    const quiz = await Quiz.findById(quizId).populate("questions");
       
    console.log("QUIZ FOUND:", quiz ? "yes" : "no");
    if (!quiz) return res.status(400).json({ message: "No quiz Found" });
       console.log("PAST QUIZ CHECK");
    let correctQuestions = 0;
    let incorrectQuestions = 0;

    const evaluatedAnswers = answers.map((answer) => {
      const question = quiz.questions.find(
        (q) => q._id.toString() === answer.questionId,
      );

      const isCorrect =
        question && question.correctAnswer === answer.selectedOption;
      if (isCorrect) correctQuestions++;
      else incorrectQuestions++;
      return {
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        isCorrect,
      };
    });
    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((correctQuestions / totalQuestions) * 100);
    const score = correctQuestions * 100;
    const isPassed = percentage >= quiz.passingScore;
    const result = await Result.create({
      quizId,
      userId,
      totalQuestions,
      correctQuestions,
      incorrectQuestions,
      percentage,
      score,
       isPassed, 
      answers: evaluatedAnswers,
      timeTaken,
    });
    if (!quiz.participants.includes(userId)) {
      await Quiz.findByIdAndUpdate(quizId, {
        $addToSet: { participants: userId },
      });
    }

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.log("Error in submitting quiz", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const result = async (req, res) => {
  try {
    const result = await Result.findOne({userId:req.user._id,quizId:req.params.id})
    .populate("quizId","title topic")
    .populate("answers.questionId", "question correctAnswer");
     if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log("Error in getting result", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
