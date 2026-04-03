import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { axiosInstance } from"../libs/axios.js";
import toast from "react-hot-toast";

export default function ManualCreatePage() {
  const { state } = useLocation();
  const { formData: quizDetails } = state || {};
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: "",
      },
    ]);
    setActiveQuestion(questions.length);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return toast.error("At least one question is required");
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    setActiveQuestion(Math.max(0, index - 1));
  };

  const handleSubmit = async () => {
    // Validate
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question) return toast.error(`Question ${i + 1} is empty`);
      if (!q.option1 || !q.option2) return toast.error(`Question ${i + 1} needs at least 2 options`);
      if (!q.correctAnswer) return toast.error(`Question ${i + 1} needs a correct answer`);
    }

    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post("/dashboard/create", {
        ...quizDetails,
        questions,
      });
      toast.success("Quiz created successfully!");
      navigate(`/quiz/${res.data.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = questions[activeQuestion];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .manual-root {
          min-height: 100vh;
          background: #0f0f13;
          font-family: 'Sora', sans-serif;
          color: white;
          display: flex;
          flex-direction: column;
        }

        /* ── Topbar ── */
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px;
          background: #18181f;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .back-btn {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: #23232e;
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: background 0.2s;
        }

        .back-btn:hover { background: #2d2d3a; }

        .topbar-title {
          font-size: 18px;
          font-weight: 700;
        }

        .topbar-subtitle {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-top: 2px;
          font-family: 'DM Sans', sans-serif;
        }

        .topbar-right {
          display: flex;
          gap: 10px;
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          padding: 9px 20px;
          border-radius: 9px;
          cursor: pointer;
          font-size: 14px;
          font-family: 'Sora', sans-serif;
          transition: border-color 0.2s;
        }

        .btn-secondary:hover { border-color: rgba(255,255,255,0.4); }

        .btn-primary {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          color: white;
          padding: 9px 22px;
          border-radius: 9px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          box-shadow: 0 4px 16px rgba(124,58,237,0.4);
          transition: opacity 0.2s;
        }

        .btn-primary:hover { opacity: 0.88; }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── Main Layout ── */
        .main-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          flex: 1;
          min-height: calc(100vh - 70px);
        }

        /* ── Sidebar ── */
        .sidebar {
          background: #18181f;
          border-right: 1px solid rgba(255,255,255,0.07);
          padding: 24px 16px;
          overflow-y: auto;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding: 0 4px;
        }

        .sidebar-title {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-add-q {
          background: rgba(124,58,237,0.2);
          border: 1px solid rgba(124,58,237,0.3);
          color: #a78bfa;
          padding: 5px 10px;
          border-radius: 7px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          transition: background 0.2s;
        }

        .btn-add-q:hover { background: rgba(124,58,237,0.35); }

        .question-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          margin-bottom: 6px;
          border: 1px solid transparent;
          transition: all 0.15s;
          background: transparent;
          width: 100%;
          text-align: left;
        }

        .question-pill.active {
          background: rgba(124,58,237,0.15);
          border-color: rgba(124,58,237,0.3);
        }

        .question-pill:hover:not(.active) { background: rgba(255,255,255,0.04); }

        .pill-number {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          background: #23232e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
          color: rgba(255,255,255,0.6);
        }

        .question-pill.active .pill-number {
          background: #7c3aed;
          color: white;
        }

        .pill-text {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        .question-pill.active .pill-text { color: white; }

        .pill-delete {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.2);
          cursor: pointer;
          font-size: 14px;
          padding: 2px 4px;
          border-radius: 4px;
          transition: color 0.15s;
          flex-shrink: 0;
        }

        .pill-delete:hover { color: #f87171; }

        /* ── Editor ── */
        .editor {
          padding: 32px;
          overflow-y: auto;
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
        }

        .editor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .editor-title {
          font-size: 18px;
          font-weight: 700;
        }

        .q-count {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          font-family: 'DM Sans', sans-serif;
        }

        /* Card */
        .card {
          background: #18181f;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .card-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        .field-input {
          width: 100%;
          padding: 12px 14px;
          background: #23232e;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: white;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
          resize: none;
        }

        .field-input:focus { border-color: #a78bfa; }
        .field-input::placeholder { color: rgba(255,255,255,0.2); }

        /* Options Grid */
        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .option-wrap {
          position: relative;
        }

        .option-label {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,0.3);
          pointer-events: none;
          font-family: 'Sora', sans-serif;
        }

        .option-input {
          width: 100%;
          padding: 12px 14px 12px 36px;
          background: #23232e;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: white;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }

        .option-input:focus { border-color: #a78bfa; }
        .option-input::placeholder { color: rgba(255,255,255,0.2); }

        /* Correct Answer Select */
        .correct-select {
          width: 100%;
          padding: 12px 14px;
          background: #23232e;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: white;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s;
        }

        .correct-select:focus { border-color: #a78bfa; }
        .correct-select option { background: #23232e; }

        /* Quiz Info Banner */
        .info-banner {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .info-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #18181f;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      <div className="manual-root">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-left">
            <button className="back-btn" onClick={() => navigate(-1)}>‹</button>
            <div>
              <div className="topbar-title">Manual Quiz Creator</div>
              <div className="topbar-subtitle">{quizDetails?.title || "Untitled Quiz"}</div>
            </div>
          </div>
          <div className="topbar-right">
            <button className="btn-secondary" onClick={() => navigate("/dashboard")}>Cancel</button>
            <button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "✓ Save Quiz"}
            </button>
          </div>
        </div>

        <div className="main-layout">
          {/* Sidebar — Question List */}
          <div className="sidebar">
            <div className="sidebar-header">
              <span className="sidebar-title">Questions</span>
              <button className="btn-add-q" onClick={addQuestion}>+ Add</button>
            </div>

            {questions.map((q, i) => (
              <button
                key={i}
                className={`question-pill ${activeQuestion === i ? "active" : ""}`}
                onClick={() => setActiveQuestion(i)}
              >
                <div className="pill-number">{i + 1}</div>
                <span className="pill-text">
                  {q.question || "Untitled question"}
                </span>
                <span
                  className="pill-delete"
                  onClick={(e) => { e.stopPropagation(); removeQuestion(i); }}
                >
                  ✕
                </span>
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="editor">
            <div className="editor-header">
              <span className="editor-title">Question {activeQuestion + 1}</span>
              <span className="q-count">{questions.length} question{questions.length > 1 ? "s" : ""} total</span>
            </div>

            {/* Quiz Info Chips */}
            <div className="info-banner">
              <div className="info-chip">🕐 {quizDetails?.timeLimit || 15} min</div>
              <div className="info-chip">✅ {quizDetails?.passingScore || 70}% to pass</div>
              <div className="info-chip">🔀 {quizDetails?.randomizeQuestions ? "Randomized" : "In order"}</div>
            </div>

            {/* Question Text */}
            <div className="card">
              <div className="card-label">Question</div>
              <textarea
                className="field-input"
                rows={3}
                placeholder="Type your question here..."
                value={currentQ.question}
                onChange={(e) => handleQuestionChange(activeQuestion, "question", e.target.value)}
              />
            </div>

            {/* Options */}
            <div className="card">
              <div className="card-label">Answer Options</div>
              <div className="options-grid">
                {["option1", "option2", "option3", "option4"].map((opt, i) => (
                  <div className="option-wrap" key={opt}>
                    <span className="option-label">{String.fromCharCode(65 + i)}</span>
                    <input
                      className="option-input"
                      type="text"
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      value={currentQ[opt]}
                      onChange={(e) => handleQuestionChange(activeQuestion, opt, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Correct Answer */}
            <div className="card">
              <div className="card-label">Correct Answer</div>
              <select
                className="correct-select"
                value={currentQ.correctAnswer}
                onChange={(e) => handleQuestionChange(activeQuestion, "correctAnswer", e.target.value)}
              >
                <option value="">Select the correct answer</option>
                {["option1", "option2", "option3", "option4"].map((opt, i) => (
                  currentQ[opt] && (
                    <option key={opt} value={currentQ[opt]}>
                      {String.fromCharCode(65 + i)}: {currentQ[opt]}
                    </option>
                  )
                ))}
              </select>
            </div>

            {/* Add Next Question */}
            <button
              onClick={addQuestion}
              style={{
                width: "100%",
                padding: "14px",
                background: "transparent",
                border: "1.5px dashed rgba(255,255,255,0.12)",
                borderRadius: "12px",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: "'Sora', sans-serif",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.target.style.borderColor = "#a78bfa"; e.target.style.color = "#a78bfa"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.color = "rgba(255,255,255,0.4)"; }}
            >
              + Add Next Question
            </button>
          </div>
        </div>
      </div>
    </>
  );
}