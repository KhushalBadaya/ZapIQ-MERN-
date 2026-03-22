import OpenAI from "openai";
import Question from "../models/Question.js";
import Quiz from "../models/Quiz.js";

export const createQuizManul = async (req, res) => {
  try {
    const { question, option1, option2, option3, option4, correctanswer } =
      req.body;
    if (!question || !option1 || !option2 || !correctanswer)
      return res.status(400).json({ message: "Invaild input" });
    const userId = req.user._id;
    const newQuestion = await Question.create({
      question,
      option1,
      option2,
      option3,
      option4,
      correctanswer,
      createdBy: userId,
    });

    const newQuiz = await Quiz.create({
      questions: [newQuestion._id],
      createdBy: userId,
    });
    res.status(201).json({ success: true, data: newQuiz });
  } catch (error) {
    console.log("Error in creating quiz", error);
    res.stauts(500).json({ message: "Internal sever Error" });
  }
};

export const createQuizwithAI = async (req, res) => {
  try {
    const { topic, numberofquestions } = req.body;
    if (!topic) return res.status(400).json({ message: "Topic is required" });
    if (!numberofquestions || numberofquestions < 1 || numberofquestions > 20)
      return res
        .status(400)
        .json({ message: "Number of questions must be in between 1 and 20" });
    const userId = req.user._id;
    const prompt = `Generate ${numberofquestions} quiz questions from topic ${topic}  
        Return ONLY a valid JSON array, no extra text, no markdown, no backticks.
        Each object must follow this exact format:
        [
            {
                "question": "Question text here",
                "option1": "First option",
                "option2": "Second option",
                "option3": "Third option",
                "option4": "Fourth option",
                "correctAnswer": "Exact text of the correct option"
            }
        ]`;

    const response = await OpenAI.Chat.Completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    const rawContent = response.choices[0].message.content;
    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(rawContent);
    } catch (parseError) {
      return res
        .status(500)
        .json({ message: "AI returned invalid format, please try again" });
    }
    const savedQuestions = await Question.insertMany(
      parsedQuestions.map((q) => ({
        question: q.question,
        option1: q.option1,
        option2: q.option2,
        option3: q.option3,
        option4: q.option4,
        correctAnswer: q.correctAnswer,
        createdBy: userId,
      })),
    );
    const newQuiz = await Quiz.create({
      title: topic,
      topic: topic,
      questions: savedQuestions.map((q) => q._id),
      createdBy: userId,
      isAIGenerated: true,
    });

    res.status(201).json({ success: true, data: newQuiz });
  } catch (error) {
    console.log("Error in AI quiz generation", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRecentQuiz = async (req, res) => {};
export const getQuizHistroy = async (req, res) => {};
