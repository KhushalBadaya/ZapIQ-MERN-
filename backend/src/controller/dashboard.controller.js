import Quiz from "../models/Quiz.js";
import { ENV } from "../lib/env.js";
import Groq from "groq-sdk";
import Question from "../models/Question.js";
export const createQuizManul = async (req, res) => {
  try {
    const { questions, title, description, timeLimit, passingScore, randomizeQuestions, immediateResults, topic } = req.body;
    
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Invalid input: Please provide questions" });
    }

    const userId = req.user._id;

    // Map questions to match the Question schema
    const validQuestions = questions.map(q => ({
      question: q.question,
      answer1: q.option1,
      answer2: q.option2,
      answer3: q.option3,
      answer4: q.option4,
      correctAnswer: q.correctAnswer,
      createdBy: userId,
    })).filter(q => q.question && q.answer1 && q.answer2 && q.correctAnswer);

    if (validQuestions.length === 0) {
      return res.status(400).json({ message: "Invalid input: No valid questions provided" });
    }

    const savedQuestions = await Question.insertMany(validQuestions);

    const newQuiz = await Quiz.create({
      title: title || "Untitled Quiz",
      description,
      timeLimit,
      passingScore,
      randomizeQuestions,
      immediateResults,
      topic,
      questions: savedQuestions.map((q) => q._id),
      createdBy: userId,
      isAIgenerated: false,
    });

    res.status(201).json({ success: true, data: newQuiz });
  } catch (error) {
    console.log("Error in creating quiz", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const createQuizwithAI = async (req, res) => {
  try {
    const {
      topic,
      numberOfQuestions,
      title,
      description,
      timeLimit,
      passingScore,
      randomizeQuestions,
      immediateResults,
    } = req.body;
    if (!topic) return res.status(400).json({ message: "Topic is required" });
    if (!numberOfQuestions || numberOfQuestions < 1 || numberOfQuestions > 20)
      return res
        .status(400)
        .json({ message: "Number of questions must be in between 1 and 20" });
    const userId = req.user._id;
    const prompt = `Generate ${numberOfQuestions} quiz questions from topic ${topic}  
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
    const client = new Groq({ apiKey: ENV.GROQ_API_KEY });
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });
    const rawContent = response.choices[0].message.content;
    if (!rawContent) {
      console.log("FULL OPENAI RESPONSE:", response);
      return res.status(500).json({
        message: "AI did not return content",
      });
    }

    let parsedQuestions;

    try {
      // Extract ONLY JSON array
      const start = rawContent.indexOf("[");
      const end = rawContent.lastIndexOf("]");

      if (start === -1 || end === -1) {
        throw new Error("No JSON found");
      }

      const jsonString = rawContent.slice(start, end + 1);

      parsedQuestions = JSON.parse(jsonString);
    } catch (err) {
      console.log("RAW AI RESPONSE:", rawContent);
      return res.status(500).json({
        message: "AI returned invalid JSON",
      });
    }
    console.log("PARSED:", parsedQuestions);
    console.log("PARSED:", parsedQuestions);

    const validQuestions = parsedQuestions
      .map((q) => ({
        question: q.question || "",
        answer1: q.option1 || "",
        answer2: q.option2 || "",
        answer3: q.option3 || "",
        answer4: q.option4 || "",
        correctAnswer:
          q.correctAnswer ||
          q.correctanswer ||
          q.correct_answer ||
          q.answer ||
          "",
        createdBy: userId,
      }))
      .filter((q) => q.question && q.answer1 && q.answer2 && q.correctAnswer);

    const savedQuestions = await Question.insertMany(validQuestions);
    const newQuiz = await Quiz.create({
      title,
      description,
      timeLimit,
      passingScore,
      randomizeQuestions,
      immediateResults,
      questions: savedQuestions.map((q) => q._id),
      createdBy: userId,
      isAIgenerated: true,
    });

    res.status(201).json({ success: true, data: newQuiz });
  } catch (error) {
    console.log("Error in AI quiz generation", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getRecentQuiz = async (req, res) => {
  try {
    const userId = req.user._id;
    const { limit = 6 } = req.query;

    const recentquiz = await Quiz.find({
      $or: [{ createdBy: userId }, { participants: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .populate("createdBy", "name email")
      .populate("questions")
      .select("title topic isAIgenerated createdAt questions createdBy");

    if (recentquiz.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }
    res.status(200).json({
      success: true,
      count: recentquiz.length,
      data: recentquiz,
    });
  } catch (error) {
    console.log("Error in getting recent quizzes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getQuizHistroy = async (req, res) => {
  try {
    const userId = req.user._id;
    const { limit } = req.query;
    const quizhistroy = await Quiz.find({
      $or: [{ createdBy: userId }, { participants: userId }],
    })
      .sort({ createdAt: -1 })
       .limit(limit ? Number(limit) : 0)
      .populate("createdBy", "name email")
      .populate("questions")
      .select("title topic isAIgenerated createdAt questions createdBy");

    if (quizhistroy.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }
    res.status(200).json({
      success: true,
      count: quizhistroy.length,
      data: quizhistroy,
    });
  } catch (error) {
    console.log("Error in getting recent quizzes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
