import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";


import { useNavigate } from "react-router-dom";


export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const handleChange= (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ ...formData });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .signup-root {
          display: flex;
          min-height: 100vh;
          width: 100%;
          font-family: 'Sora', sans-serif;
        }

        /* ── Left Panel ── */
        .signup-left {
          flex: 1;
          background: #0a0a12;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
.signup-grid {
  position: absolute;
  inset: 0;

  background-image:
    linear-gradient(rgba(139,92,246,0.25) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139,92,246,0.25) 1px, transparent 1px);

  background-size: 60px 60px;

  /* 🔥 FIX */
  height: 100%;
  width: 100%;

}

        .signup-logo {
          position: relative;
          z-index: 1;
          font-size: 52px;
          font-weight: 800;
          background: linear-gradient(90deg, #a78bfa, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -1px;
        }

        /* ── Right Panel ── */
        .signup-right {
          width: 520px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          overflow-y: auto;
        }

        .signup-form-wrap {
          width: 100%;
          max-width: 400px;
        }

        .signup-title {
          font-size: 28px;
          font-weight: 700;
          color: #111;
          margin-bottom: 6px;
        }

        .signup-subtitle {
          font-size: 14px;
          color: #888;
          margin-bottom: 24px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Role Selector ── */
        .role-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .role-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 18px 12px;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }

        .role-card.active {
          border-color: #a78bfa;
          background: #f5f0ff;
        }

        .role-icon {
          font-size: 26px;
        }

        .role-name {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .role-card.active .role-name {
          color: #7c3aed;
        }

        .role-desc {
          font-size: 12px;
          color: #999;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.4;
        }

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

        .social-btn:hover { background: #f9fafb; }

        /* ── Divider ── */
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
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 1px;
        }

        /* ── Form Fields ── */
        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 16px;
        }

        .field-wrap {
          margin-bottom: 16px;
        }

        .field-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 7px;
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
          font-size: 15px;
          pointer-events: none;
        }

        .field-input {
          width: 100%;
          padding: 11px 14px 11px 38px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #222;
          outline: none;
          transition: border-color 0.2s;
          background: white;
        }

        .field-input:focus { border-color: #a78bfa; }
        .field-input::placeholder { color: #bbb; }

        /* ── Submit Button ── */
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          transition: opacity 0.2s;
          margin-bottom: 20px;
          margin-top: 4px;
        }

        .submit-btn:hover { opacity: 0.88; }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* ── Footer ── */
        .signup-footer {
          text-align: center;
          font-size: 14px;
          color: #888;
          font-family: 'DM Sans', sans-serif;
        }

        .signup-footer a {
          color: #a78bfa;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
        }

        .signup-footer a:hover { text-decoration: underline; }
      `}</style>

      <div className="signup-root">
        {/* Left Panel */}
        <div className="signup-left">
          <div className="signup-grid" />
          <span className="signup-logo">ZapiQ</span>
        </div>

        {/* Right Panel */}
        <div className="signup-right">
          <div className="signup-form-wrap">
            <h1 className="signup-title">Create Account</h1>
            {/* Role Selector */}
            {/* Social Buttons */}
            <div className="social-row">
              <button className="social-btn">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  width={18}
                  height={18}
                  alt="Google"
                />
                Google
              </button>
            </div>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">OR</span>
              <div className="divider-line" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Full Name + Username */}
              <div className="field-row">
                <div>
                  <label className="field-label">Full Name</label>
                  <div className="field-input-wrap">
                    <span className="field-icon">👤</span>
                    <input
                      className="field-input"
                      type="text"
                      name="fullName"
                      placeholder="Enter Fullname"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="field-label">Username</label>
                  <div className="field-input-wrap">
                    <span className="field-icon">👤</span>
                    <input
                      className="field-input"
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="field-wrap">
                <label className="field-label">Email</label>
                <div className="field-input-wrap">
                  <span className="field-icon">✉</span>
                  <input
                    className="field-input"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field-wrap">
                <label className="field-label">Password</label>
                <div className="field-input-wrap">
                  <span className="field-icon">🔒</span>
                  <input
                    className="field-input"
                    type="password"
                    name="password"
                    placeholder="••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                className="submit-btn"
                type="submit"
                disabled={isSigningUp}
              >
                {isSigningUp ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            {/* Footer */}
            <p className="signup-footer">
              Already have an account?{" "}
              <a onClick={() => navigate("/login")}>Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
