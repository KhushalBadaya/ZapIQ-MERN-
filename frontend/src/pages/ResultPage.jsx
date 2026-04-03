import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";

export default function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axiosInstance.get(`/quiz/${id}/result`);
        setResult(res.data.data);
      } catch (error) {
        toast.error("Failed to load result");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [id]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s}s`;
  };

  if (loading) return (
    <div style={{
      minHeight: "100vh", background: "#0f0f13",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Sora, sans-serif", color: "white"
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
        <div>Loading results...</div>
      </div>
    </div>
  );

  const {
    score, totalQuestions, correctQuestions,
    incorrectQuestions, percentage, isPassed,
    timeTaken, answers, quizId
  } = result;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .result-root {
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
        }

        .topbar-logo {
          font-size: 20px;
          font-weight: 800;
          background: linear-gradient(90deg, #a78bfa, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn-back {
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

        .btn-back:hover { border-color: rgba(255,255,255,0.4); }

        /* ── Main ── */
        .result-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        /* ── Hero ── */
        .hero {
          text-align: center;
          margin-bottom: 36px;
        }

        @keyframes bounceIn {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity: 1; }
        }

        .result-emoji {
          font-size: 72px;
          margin-bottom: 16px;
          display: block;
          animation: bounceIn 0.6s ease forwards;
        }

        .result-title {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .result-title.passed {
          background: linear-gradient(90deg, #a78bfa, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .result-title.failed { color: #f87171; }

        .result-subtitle {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Score Ring ── */
        .score-ring-wrap {
          display: flex;
          justify-content: center;
          margin: 28px 0;
        }

        .score-ring {
          position: relative;
          width: 160px;
          height: 160px;
        }

        .score-ring svg { transform: rotate(-90deg); }

        .score-ring-text {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .score-percent {
          font-size: 32px;
          font-weight: 800;
          line-height: 1;
        }

        .score-label {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          font-family: 'DM Sans', sans-serif;
          margin-top: 4px;
        }

        /* ── Pass Badge ── */
        .badge-row {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }

        .pass-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 28px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 700;
        }

        .pass-badge.passed {
          background: rgba(34,197,94,0.12);
          border: 1.5px solid rgba(34,197,94,0.3);
          color: #86efac;
        }

        .pass-badge.failed {
          background: rgba(239,68,68,0.12);
          border: 1.5px solid rgba(239,68,68,0.3);
          color: #fca5a5;
        }

        /* ── Stats Grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: #18181f;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 20px 16px;
          text-align: center;
        }

        .stat-icon { font-size: 26px; margin-bottom: 10px; }

        .stat-value {
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .stat-value.purple { color: #a78bfa; }
        .stat-value.green  { color: #22c55e; }
        .stat-value.red    { color: #f87171; }
        .stat-value.orange { color: #f97316; }

        .stat-label {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Review ── */
        .section-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .review-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 36px;
        }

        .review-item {
          background: #18181f;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 18px 20px;
        }

        .review-item.correct { border-left: 3px solid #22c55e; }
        .review-item.wrong   { border-left: 3px solid #ef4444; }
        .review-item.skipped { border-left: 3px solid #f97316; }

        .review-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .review-q-num {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.3);
          white-space: nowrap;
          margin-top: 3px;
          font-family: 'DM Sans', sans-serif;
        }

        .review-question {
          font-size: 15px;
          font-weight: 600;
          color: white;
          line-height: 1.5;
          flex: 1;
        }

        .review-status { font-size: 18px; flex-shrink: 0; }

        .review-answers {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .answer-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
        }

        .answer-chip.selected-wrong {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #fca5a5;
        }

        .answer-chip.correct-answer {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          color: #86efac;
        }

        .answer-chip.skipped {
          background: rgba(249,115,22,0.1);
          border: 1px solid rgba(249,115,22,0.25);
          color: #fdba74;
        }

        /* ── CTA ── */
        .cta-row {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          color: white;
          padding: 13px 30px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          box-shadow: 0 4px 20px rgba(124,58,237,0.4);
          transition: opacity 0.2s;
        }

        .btn-primary:hover { opacity: 0.88; }

        .btn-secondary {
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.2);
          color: white;
          padding: 13px 30px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          transition: border-color 0.2s;
        }

        .btn-secondary:hover { border-color: rgba(255,255,255,0.4); }
      `}</style>

      <div className="result-root">

        {/* Topbar */}
        <div className="topbar">
          <span className="topbar-logo">ZapiQ</span>
          <button className="btn-back" onClick={() => navigate("/dashboard")}>
            ← Dashboard
          </button>
        </div>

        <div className="result-main">

          {/* Hero */}
          <div className="hero">
            <span className="result-emoji">{isPassed ? "🎉" : "😔"}</span>
            <div className={`result-title ${isPassed ? "passed" : "failed"}`}>
              {isPassed ? "Quiz Completed!" : "Better Luck Next Time!"}
            </div>
            <p className="result-subtitle">
              {isPassed
                ? "Congratulations! You passed the quiz successfully."
                : "Don't give up! Review your answers and try again."}
            </p>
          </div>

          {/* Score Ring */}
          <div className="score-ring-wrap">
            <div className="score-ring">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle
                  cx="80" cy="80" r="70"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="10"
                />
                <circle
                  cx="80" cy="80" r="70"
                  fill="none"
                  stroke={isPassed ? "#a78bfa" : "#f87171"}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
                  style={{ transition: "stroke-dashoffset 1s ease" }}
                />
              </svg>
              <div className="score-ring-text">
                <span className="score-percent" style={{ color: isPassed ? "#a78bfa" : "#f87171" }}>
                  {percentage}%
                </span>
                <span className="score-label">Score</span>
              </div>
            </div>
          </div>

          {/* Pass/Fail Badge */}
          <div className="badge-row">
            <div className={`pass-badge ${isPassed ? "passed" : "failed"}`}>
              {isPassed ? "✅ Passed" : "❌ Failed"}
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-value purple">{score}</div>
              <div className="stat-label">Total Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value green">{correctQuestions}</div>
              <div className="stat-label">Correct</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">❌</div>
              <div className="stat-value red">{incorrectQuestions}</div>
              <div className="stat-label">Incorrect</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-value orange">{formatTime(timeTaken)}</div>
              <div className="stat-label">Time Taken</div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="section-title">📋 Answer Review</div>
          <div className="review-list">
            {answers?.map((a, i) => {
              const q = a.questionId;
              const isSkipped = a.selectedOption === null;
              return (
                <div
                  key={i}
                  className={`review-item ${isSkipped ? "skipped" : a.isCorrect ? "correct" : "wrong"}`}
                >
                  <div className="review-header">
                    <span className="review-q-num">Q{i + 1}</span>
                    <span className="review-question">
                      {q?.question || `Question ${i + 1}`}
                    </span>
                    <span className="review-status">
                      {isSkipped ? "⏭️" : a.isCorrect ? "✅" : "❌"}
                    </span>
                  </div>

                  <div className="review-answers">
                    {isSkipped ? (
                      <div className="answer-chip skipped">
                        ⏭️ Skipped
                      </div>
                    ) : (
                      <>
                        <div className={`answer-chip ${a.isCorrect ? "correct-answer" : "selected-wrong"}`}>
                          {a.isCorrect ? "✓" : "✗"} Your answer: {a.selectedOption}
                        </div>
                        {!a.isCorrect && (
                          <div className="answer-chip correct-answer">
                            ✓ Correct: {q?.correctAnswer}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="cta-row">
            <button className="btn-secondary" onClick={() => navigate("/dashboard")}>
              🏠 Back to Dashboard
            </button>
            <button className="btn-primary" onClick={() => navigate(`/quiz/${id}`)}>
              🔄 Try Again
            </button>
          </div>

        </div>
      </div>
    </>
  );
}