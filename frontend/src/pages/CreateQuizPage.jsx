  import { useState } from "react";
  import { useNavigate } from "react-router";
  // import { axiosInstance } from "../libs/axios.js";
  import toast from "react-hot-toast";

  export default function CreateQuizModal({ onClose }) {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1 = details, 2 = mode select
    const [quizMode, setQuizMode] = useState(null); // "manual" or "ai"
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      timeLimit: 15,
      passingScore: 70,
      randomizeQuestions: true,
      immediateResults: true,
    });

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleNext = () => {
      if (!formData.title) return toast.error("Quiz title is required");
      setStep(2);
    };

    const handleModeSelect = (mode) => {
      setQuizMode(mode);
      onClose();
      if (mode === "manual") navigate("/quiz/create/manual", { state: { formData } });
      if (mode === "ai") navigate("/quiz/create/ai", { state: { formData } });
    };

    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');

          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(6px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            animation: fadeIn 0.2s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .modal-box {
            background: #13131a;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 20px;
            width: 100%;
            max-width: 860px;
            font-family: 'Sora', sans-serif;
            color: white;
            animation: slideUp 0.25s ease;
            overflow: hidden;
          }

          /* ── Modal Header ── */
          .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 28px;
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }

          .modal-header-left {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .back-btn {
            width: 34px;
            height: 34px;
            border-radius: 8px;
            background: #23232e;
            border: 1px solid rgba(255,255,255,0.1);
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            transition: background 0.2s;
          }

          .back-btn:hover { background: #2d2d3a; }

          .modal-title {
            font-size: 20px;
            font-weight: 700;
            color: white;
          }

          .modal-subtitle {
            font-size: 13px;
            color: rgba(255,255,255,0.4);
            margin-top: 2px;
            font-family: 'DM Sans', sans-serif;
          }

          .modal-header-right {
            display: flex;
            gap: 10px;
            align-items: center;
          }

          .btn-draft {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            padding: 9px 20px;
            border-radius: 9px;
            cursor: pointer;
            font-size: 14px;
            font-family: 'Sora', sans-serif;
            font-weight: 500;
            transition: border-color 0.2s;
          }

          .btn-draft:hover { border-color: rgba(255,255,255,0.4); }

          .btn-close {
            background: transparent;
            border: none;
            color: rgba(255,255,255,0.4);
            cursor: pointer;
            font-size: 20px;
            line-height: 1;
            padding: 4px 8px;
            transition: color 0.2s;
          }

          .btn-close:hover { color: white; }

          /* ── Modal Body ── */
          .modal-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
          }

          .modal-section {
            padding: 28px;
          }

          .modal-section:first-child {
            border-right: 1px solid rgba(255,255,255,0.07);
          }

          .section-title {
            font-size: 18px;
            font-weight: 700;
            color: white;
            margin-bottom: 4px;
          }

          .section-subtitle {
            font-size: 13px;
            color: rgba(255,255,255,0.4);
            margin-bottom: 24px;
            font-family: 'DM Sans', sans-serif;
          }

          /* ── Form Fields ── */
          .field-wrap {
            margin-bottom: 20px;
          }

          .field-label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: rgba(255,255,255,0.85);
            margin-bottom: 8px;
          }

          .field-input {
            width: 100%;
            padding: 12px 14px;
            background: #1e1e28;
            border: 1px solid rgba(255,255,255,0.1);
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

          /* ── Settings Fields ── */
          .setting-row {
            margin-bottom: 20px;
          }

          .setting-label {
            font-size: 14px;
            font-weight: 600;
            color: rgba(255,255,255,0.85);
            margin-bottom: 8px;
            display: block;
          }

          .setting-input-wrap {
            display: flex;
            align-items: center;
            background: #1e1e28;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 11px 14px;
            gap: 8px;
          }

          .setting-input-wrap input {
            background: transparent;
            border: none;
            outline: none;
            color: white;
            font-size: 14px;
            font-family: 'DM Sans', sans-serif;
            width: 100%;
          }

          .setting-unit {
            font-size: 13px;
            color: rgba(255,255,255,0.35);
            font-family: 'DM Sans', sans-serif;
            white-space: nowrap;
          }

          /* Toggle */
          .toggle-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
          }

          .toggle-info {}

          .toggle-name {
            font-size: 14px;
            font-weight: 600;
            color: rgba(255,255,255,0.85);
          }

          .toggle-desc {
            font-size: 12px;
            color: rgba(255,255,255,0.35);
            font-family: 'DM Sans', sans-serif;
            margin-top: 2px;
          }

          .toggle {
            position: relative;
            width: 44px;
            height: 24px;
            flex-shrink: 0;
          }

          .toggle input { opacity: 0; width: 0; height: 0; }

          .toggle-slider {
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.15);
            border-radius: 100px;
            cursor: pointer;
            transition: background 0.2s;
          }

          .toggle-slider::before {
            content: '';
            position: absolute;
            width: 18px;
            height: 18px;
            left: 3px;
            top: 3px;
            background: white;
            border-radius: 50%;
            transition: transform 0.2s;
          }

          .toggle input:checked + .toggle-slider { background: #7c3aed; }
          .toggle input:checked + .toggle-slider::before { transform: translateX(20px); }

          /* ── Modal Footer ── */
          .modal-footer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 12px;
            padding: 18px 28px;
            border-top: 1px solid rgba(255,255,255,0.07);
          }

          .btn-prev {
            display: flex;
            align-items: center;
            gap: 6px;
            background: transparent;
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            padding: 10px 20px;
            border-radius: 9px;
            cursor: pointer;
            font-size: 14px;
            font-family: 'Sora', sans-serif;
            transition: border-color 0.2s;
          }

          .btn-prev:hover { border-color: rgba(255,255,255,0.4); }

          .btn-next {
            display: flex;
            align-items: center;
            gap: 6px;
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            border: none;
            color: white;
            padding: 10px 24px;
            border-radius: 9px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            font-family: 'Sora', sans-serif;
            box-shadow: 0 4px 16px rgba(124,58,237,0.4);
            transition: opacity 0.2s;
          }

          .btn-next:hover { opacity: 0.88; }

          /* ── Step 2 — Mode Select ── */
          .mode-body {
            padding: 32px 28px;
          }

          .mode-title {
            font-size: 18px;
            font-weight: 700;
            color: white;
            margin-bottom: 6px;
            text-align: center;
          }

          .mode-subtitle {
            font-size: 14px;
            color: rgba(255,255,255,0.4);
            text-align: center;
            margin-bottom: 28px;
            font-family: 'DM Sans', sans-serif;
          }

          .mode-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .mode-card {
            background: #1e1e28;
            border: 1.5px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            padding: 28px 20px;
            cursor: pointer;
            text-align: center;
            transition: all 0.2s;
          }

          .mode-card:hover {
            border-color: #a78bfa;
            background: rgba(124,58,237,0.1);
            transform: translateY(-2px);
          }

          .mode-icon {
            font-size: 44px;
            margin-bottom: 14px;
          }

          .mode-name {
            font-size: 16px;
            font-weight: 700;
            color: white;
            margin-bottom: 8px;
          }

          .mode-desc {
            font-size: 13px;
            color: rgba(255,255,255,0.45);
            font-family: 'DM Sans', sans-serif;
            line-height: 1.5;
          }

          .mode-badge {
            display: inline-block;
            margin-top: 12px;
            padding: 4px 12px;
            border-radius: 100px;
            font-size: 11px;
            font-weight: 600;
            font-family: 'DM Sans', sans-serif;
          }

          .mode-badge.manual {
            background: rgba(255,255,255,0.08);
            color: rgba(255,255,255,0.5);
          }

          .mode-badge.ai {
            background: rgba(124,58,237,0.2);
            color: #a78bfa;
          }
        `}</style>

        <div className="modal-overlay" onClick={(e) => e.target.classList.contains("modal-overlay") && onClose()}>
          <div className="modal-box">

            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-left">
                {step === 2 ? (
                  <button className="back-btn" onClick={() => setStep(1)}>‹</button>
                ) : (
                  <button className="back-btn" onClick={onClose}>‹</button>
                )}
                <div>
                  <div className="modal-title">Create New Quiz</div>
                  <div className="modal-subtitle">
                    {step === 1 ? "Add questions, set answers and configure quiz settings" : "Choose how you want to create your quiz"}
                  </div>
                </div>
              </div>
              <div className="modal-header-right">

                <button className="btn-close" onClick={onClose}>✕</button>
              </div>
            </div>

            {/* Step 1 — Quiz Details + Settings */}
            {step === 1 && (
              <>
                <div className="modal-body">

                  {/* Left — Quiz Details */}
                  <div className="modal-section">
                    <div className="section-title">Quiz Details</div>
                    <div className="section-subtitle">Basic information about your quiz</div>

                    <div className="field-wrap">
                      <label className="field-label">Quiz Title</label>
                      <input
                        className="field-input"
                        type="text"
                        name="title"
                        placeholder="e.g. Introduction to Science"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="field-wrap">
                      <label className="field-label">Description</label>
                      <textarea
                        className="field-input"
                        name="description"
                        rows={5}
                        placeholder="Describe what this quiz is about..."
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Right — Quiz Settings */}
                  <div className="modal-section">
                    <div className="section-title">Quiz Settings</div>
                    <div className="section-subtitle">Configure how your quiz works</div>

                    {/* Time Limit */}
                    <div className="setting-row">
                      <label className="setting-label">Time Limit</label>
                      <div className="setting-input-wrap">
                        <span style={{ fontSize: 16 }}>🕐</span>
                        <input
                          type="number"
                          name="timeLimit"
                          value={formData.timeLimit}
                          onChange={handleChange}
                          min={1}
                        />
                        <span className="setting-unit">minutes</span>
                      </div>
                    </div>

                    {/* Passing Score */}
                    <div className="setting-row">
                      <label className="setting-label">Passing Score</label>
                      <div className="setting-input-wrap">
                        <span style={{ fontSize: 16 }}>✅</span>
                        <input
                          type="number"
                          name="passingScore"
                          value={formData.passingScore}
                          onChange={handleChange}
                          min={1}
                          max={100}
                        />
                        <span className="setting-unit">%</span>
                      </div>
                    </div>

                    {/* Randomize Questions */}
                    <div className="toggle-row">
                      <div className="toggle-info">
                        <div className="toggle-name">Randomize Questions</div>
                        <div className="toggle-desc">Show questions in random order</div>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          name="randomizeQuestions"
                          checked={formData.randomizeQuestions}
                          onChange={handleChange}
                        />
                        <span className="toggle-slider" />
                      </label>
                    </div>

                    {/* Immediate Results */}
                    <div className="toggle-row">
                      <div className="toggle-info">
                        <div className="toggle-name">Immediate Results</div>
                        <div className="toggle-desc">Show results for each question</div>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          name="immediateResults"
                          checked={formData.immediateResults}
                          onChange={handleChange}
                        />
                        <span className="toggle-slider" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                  <button className="btn-prev" onClick={onClose}>Cancel</button>
                  <button className="btn-next" onClick={handleNext}>Next ›</button>
                </div>
              </>
            )}

            {/* Step 2 — Mode Select */}
            {step === 2 && (
              <>
                <div className="mode-body">
                  <div className="mode-title">How do you want to create your quiz?</div>
                  <div className="mode-subtitle">Choose a method to add questions to your quiz</div>

                  <div className="mode-grid">
                    {/* Manual */}
                    <div className="mode-card" onClick={() => handleModeSelect("manual")}>
                      <div className="mode-icon">✍️</div>
                      <div className="mode-name">Manual</div>
                      <div className="mode-desc">Write your own questions and answers one by one with full control</div>
                      <span className="mode-badge manual">Custom Questions</span>
                    </div>

                    {/* AI Generated */}
                    <div className="mode-card" onClick={() => handleModeSelect("ai")}>
                      <div className="mode-icon">🤖</div>
                      <div className="mode-name">AI Generated</div>
                      <div className="mode-desc">Enter a topic and let AI automatically generate questions for you</div>
                      <span className="mode-badge ai">✦ Powered by AI</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                  <button className="btn-prev" onClick={() => setStep(1)}>‹ Prev</button>
                </div>
              </>
            )}

          </div>
        </div>
      </>
    );
  }