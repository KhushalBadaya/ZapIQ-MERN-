import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";
export default function AICreatePage() {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);

  const questionOptions = [5, 10, 15, 20];

  const handleGenerate = async () => {
    if (!topic) return toast.error("Please enter a topic");
    if (!numberOfQuestions) return toast.error("Please select number of questions");

    setIsGenerating(true);

    try {
      const res = await axiosInstance.post("/dashboard/generate", {
        title: topic,
        description: "",
        topic,
        numberOfQuestions,
        timeLimit: 15,
        passingScore: 70,
        randomizeQuestions: true,
        immediateResults: true,
      });

      toast.success("Quiz generated successfully!");
      navigate(`/quiz/${res.data.data._id}`);
    } catch (error) {
 console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response?.data);
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
        }

        .topbar-title {
          font-size: 18px;
          font-weight: 700;
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          padding: 9px 20px;
          border-radius: 9px;
          cursor: pointer;
        }

        .ai-main {
          max-width: 700px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        .ai-hero {
          text-align: center;
          margin-bottom: 40px;
        }

        .ai-icon {
          font-size: 56px;
          margin-bottom: 16px;
        }

        .ai-title {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(90deg, #a78bfa, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ai-subtitle {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
        }

        .card {
          background: #18181f;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .topic-input {
          width: 100%;
          padding: 14px;
          background: #23232e;
          border-radius: 12px;
          color: white;
          border: none;
        }

        .q-count-row {
          display: flex;
          gap: 10px;
        }

        .q-count-btn {
          flex: 1;
          padding: 12px;
          background: #23232e;
          border-radius: 10px;
          cursor: pointer;
          border: 1px solid transparent;
        }

        .q-count-btn.active {
          border: 1.5px solid #a78bfa;
          color: #a78bfa;
        }

        .generate-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border-radius: 14px;
          color: white;
          font-weight: 700;
          cursor: pointer;
        }
      `}</style>

      <div className="ai-root">
        <div className="topbar">
          <div className="topbar-left">
            <button className="back-btn" onClick={() => navigate(-1)}>‹</button>
            <div className="topbar-title">AI Quiz Generator</div>
          </div>
          <button className="btn-secondary" onClick={() => navigate("/dashboard")}>
            Cancel
          </button>
        </div>

        <div className="ai-main">
          <div className="ai-hero">
            <div className="ai-icon">🤖</div>
            <div className="ai-title">AI Quiz Generator</div>
            <p className="ai-subtitle">
              Enter a topic and let AI generate quiz questions automatically.
            </p>
          </div>

          {isGenerating ? (
            <div className="card">Generating your quiz...</div>
          ) : (
            <>
              <div className="card">
                <input
                  className="topic-input"
                  placeholder="e.g. World War 2"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="card">
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

              <button className="generate-btn" onClick={handleGenerate}>
                Generate {numberOfQuestions} Questions with AI
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}