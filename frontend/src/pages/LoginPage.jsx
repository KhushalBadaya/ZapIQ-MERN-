import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          display: flex;
          min-height: 100vh;
          font-family: 'Sora', sans-serif;
        }

        /* LEFT */
        .login-left {
          flex: 1;
          background: #0a0a12;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .login-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(139,92,246,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.25) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .login-logo {
          font-size: 52px;
          font-weight: 800;
          background: linear-gradient(90deg, #a78bfa, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          z-index: 1;
        }

        /* RIGHT */
        .login-right {
          width: 520px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
        }

        .login-wrap {
          width: 100%;
          max-width: 400px;
        }

        .login-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .login-subtitle {
          font-size: 14px;
          color: #888;
          margin-bottom: 24px;
          font-family: 'DM Sans', sans-serif;
        }

        /* SOCIAL */
             /* ── Social Buttons ── */
        .social-row {
          display: grid;
          place-items:center;
          margin-bottom: 24px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 24px  ; 
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          background: white;
          cursor: pointer;
          font-size: 14px;
          font-family: 'Sora', sans-serif;
          font-weight: 500;
          color: #333;
          transition: background 0.2s;
           min-width: 220px;
        }


        .social-btn:hover {
          background: #f9fafb;
        }

        /* DIVIDER */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }

        .divider-text {
          font-size: 12px;
          color: #aaa;
          letter-spacing: 1px;
        }

        /* INPUT */
        .field-wrap {
          margin-bottom: 16px;
        }

        .field-label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
          display: block;
        }

        .field-input-wrap {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: #aaa;
        }

        .field-input {
          width: 100%;
          padding: 11px 14px 11px 38px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
        }

        .field-input:focus {
          border-color: #a78bfa;
        }

        /* BUTTON */
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* FOOTER */
        .login-footer {
          text-align: center;
          margin-top: 20px;
          color: #888;
        }

        .login-footer span {
          color: #a78bfa;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>

      <div className="login-root">

        {/* LEFT */}
        <div className="login-left">
          <div className="login-grid"></div>
          <span className="login-logo">ZapiQ</span>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <div className="login-wrap">

            <h1 className="login-title">Welcome back</h1>
            <p className="login-subtitle">
              Enter your credentials to access your account
            </p>

            {/* SOCIAL */}
            <div className="social-row">
              <button className="social-btn">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" width={18} />
                Google
              </button>
            </div>

            {/* DIVIDER */}
            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">OR</span>
              <div className="divider-line"></div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              <div className="field-wrap">
                <label className="field-label">Email</label>
                <div className="field-input-wrap">
                  <span className="field-icon">✉</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className="field-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-wrap">
                <label className="field-label">Password</label>
                <div className="field-input-wrap">
                  <span className="field-icon">🔒</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="field-input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button className="submit-btn" disabled={isLoggingIn}>
                {isLoggingIn ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* FOOTER */}
            <p className="login-footer">
              Don’t have an account?{" "}
              <span onClick={() => navigate("/signup")}>Sign Up</span>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}