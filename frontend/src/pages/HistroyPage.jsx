import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../libs/axios.js";

export default function HistoryPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get("/dashboard/history");
        setQuizzes(res.data.data || []);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .hist-root { min-height: 100vh; background: #0f0f13; font-family: 'Sora', sans-serif; color: white; }
        .topbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 32px; background: #18181f; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .topbar-logo { font-size: 20px; font-weight: 800; background: linear-gradient(90deg, #a78bfa, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-back { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; padding: 9px 20px; border-radius: 9px; cursor: pointer; font-size: 14px; font-family: 'Sora', sans-serif; }
        .main { max-width: 900px; margin: 0 auto; padding: 40px 24px; }
        .page-title { font-size: 26px; font-weight: 700; margin-bottom: 8px; }
        .page-subtitle { font-size: 14px; color: rgba(255,255,255,0.45); font-family: 'DM Sans', sans-serif; margin-bottom: 28px; }
        .history-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; background: #18181f; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; margin-bottom: 10px; }
        .history-left { display: flex; align-items: center; gap: 12px; }
        .history-icon { width: 36px; height: 36px; background: rgba(124,58,237,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .history-title { font-size: 14px; font-weight: 600; color: white; margin-bottom: 4px; }
        .history-meta { font-size: 12px; color: rgba(255,255,255,0.4); font-family: 'DM Sans', sans-serif; }
        .btn-manage { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; padding: 7px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-family: 'Sora', sans-serif; }
        .skeleton { background: linear-gradient(90deg, #23232e 25%, #2d2d3a 50%, #23232e 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 10px; height: 60px; margin-bottom: 10px; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>

      <div className="hist-root">
        <div className="topbar">
          <span className="topbar-logo">ZapiQ</span>
          <button className="btn-back" onClick={() => navigate("/dashboard")}>← Dashboard</button>
        </div>

        <div className="main">
          <div className="page-title">📋 Full History</div>
          <div className="page-subtitle">All quizzes you've created or participated in</div>

          {loading ? (
            [1,2,3,4,5].map(i => <div key={i} className="skeleton" />)
          ) : quizzes.length === 0 ? (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", marginTop: 60 }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>📭</div>
              <div>No quiz history yet</div>
            </div>
          ) : (
            quizzes.map((q, i) => (
              <div className="history-item" key={i}>
                <div className="history-left">
                  <div className="history-icon">📋</div>
                  <div>
                    <div className="history-title">{q.title}</div>
                    <div className="history-meta">
                      🕐 {new Date(q.createdAt).toLocaleDateString()} &nbsp;·&nbsp;
                      📄 {q.questions?.length || 0} questions &nbsp;·&nbsp;
                      👥 {q.participants?.length || 0} participants
                    </div>
                  </div>
                </div>
                <button className="btn-manage" onClick={() => navigate(`/quiz/${q._id}`)}>
                  Play →
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}