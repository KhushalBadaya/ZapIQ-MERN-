  import { useEffect, useState, useRef } from "react";
  import { useAuthStore } from "../store/useAuthStore.js";
  import { useNavigate } from "react-router-dom";
  import { axiosInstance } from "../libs/axios.js";
  import CreateQuizModal from "./CreateQuizPage.jsx";
  export default function Dashboard() {
    const { authUser, logout } = useAuthStore();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const [showModal, setShowModal] = useState(false);  
    const profileRef = useRef(null);

    const [recentQuizzes, setRecentQuizzes] = useState([]);
    const [historyQuizzes, setHistoryQuizzes] = useState([]);
    const [loadingRecent, setLoadingRecent] = useState(true);
    const [loadingHistory, setLoadingHistory] = useState(true);
    // Close dropdown when clicking outside
    
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (profileRef.current && !profileRef.current.contains(e.target)) {
          setShowProfile(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      const fetchRecent = async () => {
        try {
          const res = await axiosInstance.get("/dashboard/recent?limit=5");
          setRecentQuizzes(res.data.data|| []);
        } catch (error) {
          console.log("Error fetching recent quizzes", error);
        } finally {
          setLoadingRecent(false);
        }
      };

      const fetchHistory = async () => {
        try {
          const res = await axiosInstance.get("/dashboard/history?limit=5");
          setHistoryQuizzes(res.data.data);
        } catch (error) {
          console.log("Error fetching history", error);
        } finally {
          setLoadingHistory(false);
        }
      };

      fetchRecent();
      fetchHistory();
    }, []);
  const handleLogout = async () => {
    await logout();
    navigate("/");
    setShowProfile(false);
  };

    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');

          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          .dash-root {
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
            padding: 14px 32px;
            background: #18181f;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            position: sticky;
            top: 0;
            z-index: 50;
          }

          .topbar-logo {
            font-size: 20px;
            font-weight: 800;
            background: linear-gradient(90deg, #a78bfa, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .topbar-center {
            display: flex;
            align-items: center;
            gap: 8px;
            background: #23232e;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 10px;
            padding: 9px 16px;
            width: 280px;
          }

          .topbar-center input {
            background: transparent;
            border: none;
            outline: none;
            color: white;
            font-size: 14px;
            font-family: 'DM Sans', sans-serif;
            width: 100%;
          }

          .topbar-center input::placeholder { color: #555; }

          .topbar-right {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .btn-create {
            display: flex;
            align-items: center;
            gap: 6px;
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            border: none;
            color: white;
            padding: 9px 18px;
            border-radius: 9px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            font-family: 'Sora', sans-serif;
            transition: opacity 0.2s;
          }

          .btn-create:hover { opacity: 0.88; }

          .btn-logout {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.15);
            color: rgba(255,255,255,0.6);
            padding: 9px 16px;
            border-radius: 9px;
            cursor: pointer;
            font-size: 13px;
            font-family: 'Sora', sans-serif;
            transition: all 0.2s;
          }

          .btn-logout:hover { border-color: rgba(255,255,255,0.3); color: white; }

          /* ── Profile Dropdown ── */
          .profile-wrap {
            position: relative;
          }

          .profile-btn {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            border: 2px solid rgba(255,255,255,0.15);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: 700;
            color: white;
            font-family: 'Sora', sans-serif;
            transition: border-color 0.2s;
            flex-shrink: 0;
          }

          .profile-btn:hover { border-color: rgba(255,255,255,0.4); }

          .profile-dropdown {
            position: absolute;
            top: 48px;
            right: 0;
            background: #1e1e28;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 14px;
            width: 220px;
            padding: 8px;
            box-shadow: 0 16px 40px rgba(0,0,0,0.5);
            z-index: 200;
            animation: dropDown 0.15s ease forwards;
          }

          @keyframes dropDown {
            from { opacity: 0; transform: translateY(-8px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .profile-header {
            padding: 12px 12px 10px;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            margin-bottom: 6px;
          }

          .profile-name {
            font-size: 14px;
            font-weight: 700;
            color: white;
          }

          .profile-email {
            font-size: 12px;
            color: rgba(255,255,255,0.4);
            font-family: 'DM Sans', sans-serif;
            margin-top: 2px;
          }

          .dropdown-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 12px;
            border-radius: 9px;
            cursor: pointer;
            font-size: 14px;
            color: rgba(255,255,255,0.7);
            font-family: 'DM Sans', sans-serif;
            transition: background 0.15s, color 0.15s;
            border: none;
            background: transparent;
            width: 100%;
            text-align: left;
          }

          .dropdown-item:hover { background: rgba(255,255,255,0.07); color: white; }

          .dropdown-item.danger { color: #f87171; }
          .dropdown-item.danger:hover { background: rgba(248,113,113,0.1); color: #f87171; }

          .dropdown-divider {
            height: 1px;
            background: rgba(255,255,255,0.07);
            margin: 6px 0;
          }

          /* ── Main Content ── */
          .dash-main {
            padding: 32px;
            max-width: 1200px;
            margin: 0 auto;
          }

          /* ── Page Header ── */
          .page-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 28px;
          }

          .page-title {
            font-size: 26px;
            font-weight: 700;
            color: white;
          }

          .page-subtitle {
            font-size: 14px;
            color: rgba(255,255,255,0.45);
            margin-top: 4px;
            font-family: 'DM Sans', sans-serif;
          }

          .btn-create-new {
            display: flex;
            align-items: center;
            gap: 6px;
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            border: none;
            color: white;
            padding: 11px 22px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            font-family: 'Sora', sans-serif;
            box-shadow: 0 4px 20px rgba(124,58,237,0.35);
            transition: opacity 0.2s;
          }

          .btn-create-new:hover { opacity: 0.88; }

          /* ── Top Row ── */
          .top-grid {
            margin-bottom: 20px;
          }

          /* ── Card ── */
          .card {
            background: #18181f;
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 16px;
            padding: 24px;
          }

          .card-title {
            font-size: 17px;
            font-weight: 700;
            color: white;
            margin-bottom: 4px;
          }

          .card-subtitle {
            font-size: 13px;
            color: rgba(255,255,255,0.4);
            margin-bottom: 20px;
            font-family: 'DM Sans', sans-serif;
          }

          /* ── History Items ── */
          .history-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 16px;
            background: #23232e;
            border-radius: 12px;
            margin-bottom: 10px;
            border: 1px solid rgba(255,255,255,0.05);
          }

          .history-item:last-child { margin-bottom: 0; }

          .history-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .history-icon {
            width: 36px;
            height: 36px;
            background: rgba(124,58,237,0.2);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            flex-shrink: 0;
          }

          .history-title {
            font-size: 14px;
            font-weight: 600;
            color: white;
            margin-bottom: 4px;
          }

          .history-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 12px;
            color: rgba(255,255,255,0.4);
            font-family: 'DM Sans', sans-serif;
          }

          .btn-view-live {
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            border: none;
            color: white;
            padding: 7px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            font-family: 'Sora', sans-serif;
            white-space: nowrap;
          }

          .btn-manage {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            padding: 7px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            font-family: 'Sora', sans-serif;
            white-space: nowrap;
            transition: border-color 0.2s;
          }

          .btn-manage:hover { border-color: rgba(255,255,255,0.4); }

          /* ── Top Students ── */


          /* ── Recent Quizzes ── */
          .recent-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr) 1fr;
            gap: 16px;
          }

          .quiz-card {
            background: #23232e;
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 14px;
            padding: 18px;
            cursor: pointer;
            transition: border-color 0.2s;
          }

          .quiz-card:hover { border-color: rgba(167,139,250,0.4); }

          .quiz-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
          }

          .quiz-card-title {
            font-size: 14px;
            font-weight: 600;
            color: white;
            flex: 1;
            margin-right: 8px;
          }

          .quiz-card-meta {
            display: flex;
            align-items: center;
            gap: 14px;
            font-size: 12px;
            color: rgba(255,255,255,0.4);
            font-family: 'DM Sans', sans-serif;
            margin-bottom: 12px;
          }

          .quiz-progress-label {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: rgba(255,255,255,0.4);
            font-family: 'DM Sans', sans-serif;
            margin-bottom: 6px;
          }

          .quiz-progress-bar {
            width: 100%;
            height: 5px;
            background: rgba(255,255,255,0.08);
            border-radius: 100px;
            overflow: hidden;
          }

          .quiz-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #7c3aed, #a855f7);
            border-radius: 100px;
          }

          /* Create new quiz card */
          .create-card {
            background: #23232e;
            border: 1.5px dashed rgba(255,255,255,0.15);
            border-radius: 14px;
            padding: 18px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: border-color 0.2s;
            min-height: 130px;
          }

          .create-card:hover { border-color: rgba(167,139,250,0.5); }

          .create-plus {
            font-size: 28px;
            color: rgba(167,139,250,0.6);
            margin-bottom: 8px;
          }

          .create-label {
            font-size: 14px;
            font-weight: 600;
            color: rgba(255,255,255,0.6);
            margin-bottom: 4px;
          }

          .create-desc {
            font-size: 12px;
            color: rgba(255,255,255,0.3);
            font-family: 'DM Sans', sans-serif;
            text-align: center;
          }

          /* ── Empty State ── */
          .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            text-align: center;
          }

          .empty-state img {
            width: 160px;
            height: 160px;
            margin-bottom: 16px;
            opacity: 0.85;
          }

          .empty-title {
            font-size: 15px;
            font-weight: 600;
            color: rgba(255,255,255,0.5);
            margin-bottom: 6px;
          }

          .empty-desc {
            font-size: 13px;
            color: rgba(255,255,255,0.3);
            font-family: 'DM Sans', sans-serif;
            margin-bottom: 16px;
          }

          .empty-btn {
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            border: none;
            color: white;
            padding: 9px 20px;
            border-radius: 9px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            font-family: 'Sora', sans-serif;
            transition: opacity 0.2s;
          }

          .empty-btn:hover { opacity: 0.88; }

          /* ── Loading Skeleton ── */
          .skeleton {
            background: linear-gradient(90deg, #23232e 25%, #2d2d3a 50%, #23232e 75%);
            background-size: 200% 100%;
            animation: shimmer 1.4s infinite;
            border-radius: 10px;
            height: 60px;
            margin-bottom: 10px;
          }

          @keyframes shimmer {
            0%   { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }.btn-view-all {
  background: transparent;
  border: 1px solid rgba(167,139,250,0.4);
  color: #a78bfa;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Sora', sans-serif;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-view-all:hover {
  background: rgba(167,139,250,0.1);
  border-color: #a78bfa;
}
        `}</style>

        <div className="dash-root">

          {/* Topbar */}
          <div className="topbar">
            <span className="topbar-logo">ZapiQ</span>
      
            <div className="topbar-right">
              <div className="profile-wrap" ref={profileRef}>
                <button
                  className="profile-btn"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  {authUser?.fullName?.charAt(0).toUpperCase() || "U"}
                </button>

                {showProfile && (
                  <div className="profile-dropdown">
                    {/* User Info */}
                    <div className="profile-header">
                      <div className="profile-name">{authUser?.fullName || "User"}</div>
                      <div className="profile-email">{authUser?.email || ""}</div>
                    </div>

                    {/* Menu Items */}
                    <button className="dropdown-item" onClick={() => { navigate("/profile");  setShowProfile(false); }}>
                      👤 My Profile
                    </button>
                    <button className="dropdown-item" onClick={() => { navigate("/quiz/create"); setShowModal(true);setShowProfile(false); }}>
                      ➕ Create Quiz
                    </button>         
                    <div className="dropdown-divider" />

                    <button className="dropdown-item danger" onClick={handleLogout}>
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="dash-main">

            {/* Header */}
            <div className="page-header">
              <div>
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">
                  Welcome back, {authUser?.fullName || "there"}! Here's what's happening with your quizzes
                </p>
              </div>
              <button className="btn-create-new" onClick={() =>  setShowModal(true) }>
                + Create New Quiz
              </button>
            </div>

            {/* History + Recent Side by Side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20, alignItems: "start" }}>

            {/* History */}
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <div className="card-title">History</div>
              <div className="card-subtitle">View your past Quiz history here</div>
              
              <div style={{ flex: 1 }}>
              {loadingHistory ? (
                <>
                  <div className="skeleton" />
                  <div className="skeleton" />
                  <div className="skeleton" />
                </>
              ) : historyQuizzes.length === 0 ? (
                <div className="empty-state">
                  <div style={{ fontSize: 80, marginBottom: 16 }}>📭</div>
                  <div className="empty-title">No quiz history yet!</div>
                  <div className="empty-desc">Quizzes you create or participate in will appear here</div>
                  <button className="empty-btn" onClick={() => setShowModal(true)}>Create Your First Quiz</button>
                </div>
              ) : (
                historyQuizzes.map((q, i) => (
                  <div className="history-item" key={i}>
                    <div className="history-left">
                      <div className="history-icon">📋</div>
                      <div>
                        <div className="history-title">{q.title}</div>
                        <div className="history-meta">
                          <span>🕐 {new Date(q.createdAt).toLocaleDateString()}</span>
                          <span>👥 {q.participants?.length || 0} participants</span>
                        </div>
                      </div>
                    </div>
                    {q.isLive
                      ? <button className="btn-view-live">View Live</button>
                      : <button className="btn-manage" onClick={() => navigate(`/quiz/${q._id}`)}>Play Again</button>
                    }
                  </div>
                ))
              )}
              </div>
              <button 
                className="btn-view-all" 
                style={{ marginTop: "16px", alignSelf: "center", width: "100%", padding: "10px" }} 
                onClick={() => navigate("/history")}
              >
                View All →
              </button>
            </div>

            {/* Recent Quizzes */}
            <div className="card">
              <div className="card-title">Recent Quizzes</div>
              <div className="card-subtitle">Your recently created quizzes</div>

              {loadingRecent ? (
                <>
                  <div className="skeleton" />
                  <div className="skeleton" />
                  <div className="skeleton" />
                </>
              ) : recentQuizzes.length === 0 ? (
                <div className="empty-state">
                  <div style={{ fontSize: 80, marginBottom: 16 }}>🗂️</div>
                  <div className="empty-title">No quizzes created yet!</div>
                  <div className="empty-desc">Create your first quiz and it will show up here</div>
                  <button className="empty-btn" onClick={() => setShowModal(true)}>Create Quiz</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {recentQuizzes.map((q, i) => (
                    <div className="history-item" key={i} onClick={() => navigate(`/quiz/${q._id}`)} style={{ cursor: "pointer" }}>
                      <div className="history-left">
                        <div className="history-icon">🧠</div>
                        <div>
                          <div className="history-title">{q.title}</div>
                          <div className="history-meta">
                            <span>📄 {q.questions?.length || 0} questions</span>
                            <span>👥 {q.participants?.length || 0} joined</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}

                </div>
              )}
            </div>

            </div>

          </div>
        </div>
         {showModal && <CreateQuizModal onClose={() => setShowModal(false)} />}
      </>
    );
  }