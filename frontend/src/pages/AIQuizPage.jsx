import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";


import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";

export default function AICreatePage() {
  const { state } = useLocation();
  const { formData: quizDetails } = state || {};
  const navigate = useNavigate();

  const [topic, setTopic] = useState(quizDetails?.title || "");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questionOptions = [5, 10, 15, 20];

  const handleGenerate = async () => {
    if (!topic) return toast.error("Please enter a topic");

    setIsGenerating(true);
    setGeneratedQuestions([]);

    try {
      const res = await axiosInstance.post("/dashboard/generate", {
        ...quizDetails,
        topic,
        numberOfQuestions,
      });
      toast.success("Questions generated successfully!");
      navigate(`/quiz/${res.data.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ai-root {
          min-height: 100vh;
          background: #0f0f13;
          font-family: 'Sora', sans-serif;
          color: white;
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

        /* ── Main Content ── */
        .ai-main {
          max-width: 700px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        /* ── Hero ── */
        .ai-hero {
          text-align: center;
          margin-bottom: 40px;
        }

        .ai-icon {
          font-size: 56px;
          margin-bottom: 16px;
          display: block;
        }

        .ai-title {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 10px;
          background: linear-gradient(90deg, #a78bfa, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ai-subtitle {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif;
          line-height: 1.6;
        }

        /* ── Card ── */
        .card {
          background: #18181f;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .card-label {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          margin-bottom: 10px;
          display: block;
        }

        .card-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 14px;
        }

        /* ── Topic Input ── */
        .topic-input {
          width: 100%;
          padding: 14px 16px;
          background: #23232e;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          color: white;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }

        .topic-input:focus { border-color: #a78bfa; }
        .topic-input::placeholder { color: rgba(255,255,255,0.2); }

        /* ── Number of Questions ── */
        .q-count-row {
          display: flex;
          gap: 10px;
        }

        .q-count-btn {
          flex: 1;
          padding: 12px;
          background: #23232e;
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: rgba(255,255,255,0.6);
          font-size: 15px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }

        .q-count-btn.active {
          border-color: #a78bfa;
          background: rgba(124,58,237,0.15);
          color: #a78bfa;
        }

        .q-count-btn:hover:not(.active) {
          border-color: rgba(255,255,255,0.2);
          color: white;
        }

        /* ── Quiz Settings Summary ── */
        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .setting-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #23232e;
          border-radius: 10px;
          padding: 12px 14px;
        }

        .setting-chip-icon { font-size: 18px; }

        .setting-chip-label {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          font-family: 'DM Sans', sans-serif;
        }

        .setting-chip-value {
          font-size: 14px;
          font-weight: 600;
          color: white;
        }

        /* ── Generate Button ── */
        .generate-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(124,58,237,0.45);
          transition: opacity 0.2s, transform 0.2s;
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .generate-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .generate-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* ── Loading State ── */
        .loading-wrap {
          text-align: center;
          padding: 40px 20px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .spinner {
          width: 48px;
          height: 48px;
          border: 3px solid rgba(167,139,250,0.2);
          border-top-color: #a78bfa;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 20px;
        }

        .loading-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .loading-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }

        .loading-dots span {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          margin: 0 3px;
          animation: pulse 1.2s ease infinite;
        }

        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        /* ── Tips ── */
        .tips-wrap {
          margin-top: 24px;
          padding: 16px;
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 12px;
        }

        .tips-title {
          font-size: 13px;
          font-weight: 600;
          color: #a78bfa;
          margin-bottom: 10px;
        }

        .tip-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 6px;
          line-height: 1.5;
        }

        .tip-item:last-child { margin-bottom: 0; }
      `}</style>

      <div className="ai-root">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-left">
            <button className="back-btn" onClick={() => navigate(-1)}>‹</button>
            <div>
              <div className="topbar-title">AI Quiz Generator</div>
              <div className="topbar-subtitle">{quizDetails?.title || "Untitled Quiz"}</div>
            </div>
          </div>
          <button className="btn-secondary" onClick={() => navigate("/dashboard")}>Cancel</button>
        </div>

        <div className="ai-main">
          {/* Hero */}
          <div className="ai-hero">
            <span className="ai-icon">🤖</span>
            <div className="ai-title">AI Quiz Generator</div>
            <p className="ai-subtitle">
              Enter a topic and let AI generate quiz questions for you automatically.
              It will create questions, options and correct answers instantly.
            </p>
          </div>

          {isGenerating ? (
            /* Loading State */
            <div className="card">
              <div className="loading-wrap">
                <div className="spinner" />
                <div className="loading-title">Generating your quiz</div>
                <div className="loading-desc">
                  AI is creating {numberOfQuestions} questions about "{topic}"
                </div>
                <br />
                <div className="loading-dots">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Topic Input */}
              <div className="card">
                <label className="card-label">Quiz Topic</label>
                <p className="card-desc">Be specific for better results e.g. "World War 2" not just "History"</p>
                <input
                  className="topic-input"
                  type="text"
                  placeholder="e.g. Solar System, JavaScript Basics, World History..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              {/* Number of Questions */}
              <div className="card">
                <label className="card-label">Number of Questions</label>
                <p className="card-desc">How many questions should AI generate?</p>
                <div className="q-count-row">
                  {questionOptions.map((n) => (
                    <button
                      key={n}
                      className={`q-count-btn ${numberOfQuestions === n ? "active" : ""}`}
                      onClick={() => setNumberOfQuestions(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quiz Settings Summary */}
              <div className="card">
                <label className="card-label">Quiz Settings</label>
                <div className="settings-grid">
                  <div className="setting-chip">
                    <span className="setting-chip-icon">🕐</span>
                    <div>
                      <div className="setting-chip-label">Time Limit</div>
                      <div className="setting-chip-value">{quizDetails?.timeLimit || 15} min</div>
                    </div>
                  </div>
                  <div className="setting-chip">
                    <span className="setting-chip-icon">✅</span>
                    <div>
                      <div className="setting-chip-label">Passing Score</div>
                      <div className="setting-chip-value">{quizDetails?.passingScore || 70}%</div>
                    </div>
                  </div>
                  <div className="setting-chip">
                    <span className="setting-chip-icon">🔀</span>
                    <div>
                      <div className="setting-chip-label">Randomize</div>
                      <div className="setting-chip-value">{quizDetails?.randomizeQuestions ? "Yes" : "No"}</div>
                    </div>
                  </div>
                  <div className="setting-chip">
                    <span className="setting-chip-icon">⚡</span>
                    <div>
                      <div className="setting-chip-label">Instant Results</div>
                      <div className="setting-chip-value">{quizDetails?.immediateResults ? "Yes" : "No"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                className="generate-btn"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                <span>✦</span>
                Generate {numberOfQuestions} Questions with AI
              </button>

              {/* Tips */}
              <div className="tips-wrap">
                <div className="tips-title">✦ Tips for better results</div>
                <div className="tip-item">
                  <span>→</span> Be specific: "JavaScript Arrow Functions" works better than "JavaScript"
                </div>
                <div className="tip-item">
                  <span>→</span> Add difficulty: "Advanced Python Decorators" or "Basic HTML Tags"
                </div>
                <div className="tip-item">
                  <span>→</span> Start with 10 questions for a balanced quiz
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}