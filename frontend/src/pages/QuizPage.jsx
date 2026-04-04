import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answered, setAnswered] = useState(false);
const [startTime] = useState(Date.now());
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axiosInstance.get(`/quiz/${id}`);
        setQuiz(res.data.data);
        setTimeLeft(30);
      } catch (error) {
        toast.error("Failed to load quiz");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const submitQuiz = useCallback(async (finalAnswers) => { // ✅ accepts finalAnswers to avoid stale closure
    setIsSubmitting(true);
    try {
      await axiosInstance.post(`/quiz/${id}/submit`, {
        answers: finalAnswers,
        timeTaken: Math.floor((Date.now() - startTime) / 1000),
      });
      toast.success("Quiz submitted!");
      navigate(`/quiz/${id}/result`);
    } catch (error) {
      toast.error("Failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  }, [id, quiz, timeLeft]);

const handleNext = useCallback(async (skipped = false, currentAnswers = answers) => {
  const totalQuestions = quiz?.questions?.length || 0;

  let updatedAnswers = currentAnswers;
  if (!answered && skipped) {
    updatedAnswers = [...currentAnswers, {
      questionId: quiz.questions[currentIndex]._id,
      selectedOption: null,
      isCorrect: false,
    }];
    setAnswers(updatedAnswers);
  }

  if (currentIndex === totalQuestions - 1) {
    await submitQuiz(updatedAnswers);
    return;
  }

  setCurrentIndex((i) => i + 1);
  setSelectedOption(null);
  setAnswered(false);
  setTimeLeft(30);
}, [answered, answers, currentIndex, quiz, submitQuiz]);

  // Timer
  useEffect(() => {
    if (!quiz || answered) return;
    if (timeLeft <= 0) {
      handleNext(true, answers);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quiz, answered]); // ✅ removed handleNext from deps to avoid infinite loop

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const currentQuestion = quiz?.questions[currentIndex];
  const totalQuestions = quiz?.questions?.length || 0;
  const progress = ((currentIndex + 1) / totalQuestions) * 100; 

const handleOptionSelect = (option) => {
  if (answered) return;
  setSelectedOption(option);
  setAnswered(true);

  const isCorrect = option === currentQuestion.correctAnswer;
  if (isCorrect) setScore((s) => s + 100);

  const newAnswer = {
    questionId: currentQuestion._id,
    selectedOption: option,
    isCorrect,
  };

  const updatedAnswers = [...answers, newAnswer]; // ✅ build updated array immediately
  setAnswers(updatedAnswers);

  // ✅ if last question, auto-submit with latest answers
  if (currentIndex === (quiz?.questions?.length || 0) - 1) {
    submitQuiz(updatedAnswers);
  }
};

  const getOptionStyle = (option) => {
    if (!answered) return "option-btn";
    if (option === currentQuestion.correctAnswer) return "option-btn correct";
    if (option === selectedOption && option !== currentQuestion.correctAnswer) return "option-btn wrong";
    return "option-btn";
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0f0f13", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "white", fontFamily: "Sora, sans-serif" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
        <div>Loading quiz...</div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .quiz-root { min-height: 100vh; background: #0f0f13; font-family: 'Sora', sans-serif; color: white; }
        .topbar { display: flex; align-items: center; justify-content: center; padding: 14px 32px; background: #18181f; border-bottom: 2px solid #7c3aed; position: relative; }
        .back-btn { position: absolute; left: 24px; width: 36px; height: 36px; border-radius: 9px; background: #23232e; border: 1px solid rgba(255,255,255,0.1); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; transition: background 0.2s; }
        .back-btn:hover { background: #2d2d3a; }
        .topbar-title { font-size: 17px; font-weight: 700; color: white; }
        .quiz-layout { display: grid; grid-template-columns: 1fr 280px; gap: 24px; max-width: 1100px; margin: 0 auto; padding: 32px 24px; }
        .progress-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .progress-label { font-size: 14px; color: rgba(255,255,255,0.5); font-family: 'DM Sans', sans-serif; }
        .progress-bar { width: 100%; height: 6px; background: rgba(255,255,255,0.08); border-radius: 100px; overflow: hidden; margin-bottom: 24px; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #7c3aed, #a855f7); border-radius: 100px; transition: width 0.4s ease; }
        .question-card { background: #18181f; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 24px; margin-bottom: 20px; }
        .question-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .points-badge { background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 5px 14px; border-radius: 100px; font-size: 13px; font-weight: 600; }
        .timer { display: flex; align-items: center; gap: 6px; font-size: 18px; font-weight: 700; font-family: 'DM Sans', monospace; transition: color 0.3s; }
        .timer.warning { color: #f97316; }
        .timer.danger { color: #ef4444; }
        .timer.normal { color: rgba(255,255,255,0.8); }
        .question-text { font-size: 18px; font-weight: 600; line-height: 1.6; color: white; }
        .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        .option-btn { display: flex; align-items: center; gap: 14px; padding: 16px 18px; background: #18181f; border: 1.5px solid rgba(255,255,255,0.08); border-radius: 12px; cursor: pointer; text-align: left; color: white; font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 500; transition: all 0.2s; width: 100%; }
        .option-btn:hover:not(:disabled) { border-color: rgba(167,139,250,0.5); background: rgba(124,58,237,0.1); }
        .option-btn.correct { border-color: #22c55e; background: rgba(34,197,94,0.12); color: #86efac; }
        .option-btn.wrong { border-color: #ef4444; background: rgba(239,68,68,0.12); color: #fca5a5; }
        .option-btn:disabled { cursor: default; }
        .option-letter { width: 30px; height: 30px; border-radius: 7px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; color: rgba(255,255,255,0.6); }
        .option-btn.correct .option-letter { background: rgba(34,197,94,0.2); color: #86efac; }
        .option-btn.wrong .option-letter { background: rgba(239,68,68,0.2); color: #fca5a5; }
        .footer-row { display: flex; align-items: center; justify-content: space-between; }
        .btn-skip { display: flex; align-items: center; gap: 6px; background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.5); padding: 10px 18px; border-radius: 9px; cursor: pointer; font-size: 14px; font-family: 'Sora', sans-serif; transition: all 0.2s; }
        .btn-skip:hover { border-color: rgba(255,255,255,0.3); color: white; }
        .btn-next { display: flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #7c3aed, #a855f7); border: none; color: white; padding: 12px 28px; border-radius: 10px; cursor: pointer; font-size: 15px; font-weight: 600; font-family: 'Sora', sans-serif; box-shadow: 0 4px 20px rgba(124,58,237,0.4); transition: opacity 0.2s; }
        .btn-next:hover { opacity: 0.88; }
        .btn-next:disabled { opacity: 0.5; cursor: not-allowed; }
        .stats-panel { display: flex; flex-direction: column; gap: 12px; }
        .stats-title { font-size: 16px; font-weight: 700; color: white; margin-bottom: 4px; }
        .stat-card { background: #18181f; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 18px; text-align: center; }
        .stat-label { font-size: 13px; color: rgba(255,255,255,0.4); font-family: 'DM Sans', sans-serif; margin-bottom: 8px; }
        .stat-value { font-size: 22px; font-weight: 800; color: #a78bfa; }
        .stat-value.green { color: #22c55e; }
        .stat-value.white { color: white; }
      `}</style>

      <div className="quiz-root">
        <div className="topbar">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>‹</button>
          <div className="topbar-title">{quiz?.title}</div>
        </div>

        <div className="quiz-layout">
          <div className="quiz-left">
            <div className="progress-row">
              <span className="progress-label">Question {currentIndex + 1} of {totalQuestions}</span>
              <span className="progress-label">{Math.round(progress)}% Complete</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="question-card">
              <div className="question-meta">
                <span className="points-badge">100 points</span>
                <span className={`timer ${timeLeft <= 10 ? "danger" : timeLeft <= 20 ? "warning" : "normal"}`}>
                  🕐 {formatTime(timeLeft)}
                </span>
              </div>
              <p className="question-text">{currentQuestion?.question}</p>
            </div>

            <div className="options-grid">
              {["answer1", "answer2", "answer3", "answer4"].map((opt, i) => {
                const value = currentQuestion?.[opt];
                if (!value) return null;
                return (
                  <button
                    key={opt}
                    className={getOptionStyle(value)}
                    onClick={() => handleOptionSelect(value)}
                    disabled={answered}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                    {value}
                  </button>
                );
              })}
            </div>

            <div className="footer-row">
              <button className="btn-skip" onClick={() => handleNext(true, answers)}>
                ⚑ Skip
              </button>
              <button
                className="btn-next"
                onClick={() => handleNext(false, answers)}
                disabled={!answered || isSubmitting}
              >
                {currentIndex === totalQuestions - 1 ? "Submit Quiz" : "Next Question ›"}
              </button>
            </div>
          </div>

          <div className="stats-panel">
            <div className="stats-title">Quiz Stats</div>
            <div className="stat-card">
              <div className="stat-label">Score</div>
              <div className="stat-value">{score}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Progress</div>
              <div className="stat-value white">{currentIndex + 1}/{totalQuestions}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Correct</div>
              <div className="stat-value green">{answers.filter(a => a.isCorrect).length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Skipped</div>
              <div className="stat-value white">{answers.filter(a => a.selectedOption === null).length}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}