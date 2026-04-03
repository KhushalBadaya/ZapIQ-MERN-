import { useEffect, useState } from "react";
import { useDelayedNavigate } from "../hooks/useDelayedNavigate";
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { goTo, loadingPath } = useDelayedNavigate(400);
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #0d0d14;
          color: white;
          font-family: 'Sora', sans-serif;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.25; }
        }

  /* Find this in your CSS */
.landing-root {
  position: relative;
  min-height: 100vh;
  width: 100%;          /* ← add this */
  margin: 0;            /* ← add this */
  padding: 0;           /* ← add this */
  background: linear-gradient(135deg, #0d0d14 0%, #150d2a 50%, #0d1525 100%);
  overflow: hidden;
  color: white;
  font-family: 'Sora', sans-serif;
}

        /* Grid */
        .grid-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image:
            linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridPulse 4s ease-in-out infinite;
        }

        /* Glow orbs */
        .glow-left {
          position: absolute;
          top: -120px;
          left: -180px;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 70%);
          filter: blur(60px);
          z-index: 0;
        }

        .glow-right {
          position: absolute;
          bottom: -120px;
          right: -180px;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(219,39,119,0.3) 0%, transparent 70%);
          filter: blur(60px);
          z-index: 0;
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 18px 48px;
          transition: all 0.3s ease;
        }

        .navbar.scrolled {
          background: rgba(13,13,20,0.85);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

.nav-inner {
  width: 100%;
  max-width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
        .logo {
          font-size: 22px;
          font-weight: 800;
          background: linear-gradient(90deg, #a78bfa, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.5px;
        }

        .nav-links {
          display: flex;
          gap: 36px;
        }

        .nav-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .nav-link:hover { color: white; }

        .nav-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .btn-signin {
         display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.25);
          color: white;
          padding: 9px 22px;
          border-radius: 9px;
          cursor: pointer;
          font-size: 14px;
          font-family: 'Sora', sans-serif;
          font-weight: 500;
          transition: border-color 0.2s;
        }

        .btn-signin:hover { border-color: rgba(255,255,255,0.5); }

        .btn-register {
             display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          color: white;
          padding: 9px 22px;
          border-radius: 9px;
          cursor: pointer;
          font-size: 14px;
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(124,58,237,0.45);
          transition: opacity 0.2s;
        }

        .btn-register:hover { opacity: 0.88; }

        /* Hero */
        .hero {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 180px 24px 100px;
        }

        /* Badge */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 7px 18px;
          margin-bottom: 32px;
          animation: fadeUp 0.5s ease forwards;
        }

        .badge-icon { color: #a78bfa; font-size: 14px; }

        .badge-text {
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.3px;
        }

        /* Heading */
        .heading {
          font-size: clamp(42px, 6vw, 72px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1.5px;
          max-width: 760px;
          margin-bottom: 24px;
          animation: fadeUp 0.5s ease 0.1s both;
        }

        .heading-accent {
          background: linear-gradient(90deg, #a78bfa 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Subtext */
        .subtext {
          font-size: 16px;
          color: rgba(255,255,255,0.55);
          max-width: 520px;
          line-height: 1.75;
          margin-bottom: 40px;
          font-family: 'DM Sans', sans-serif;
          animation: fadeUp 0.5s ease 0.2s both;
        }

        /* CTA row */
        .cta-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 52px;
          animation: fadeUp 0.5s ease 0.3s both;
        }

        .btn-get-started {
                 display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          color: white;
          padding: 15px 36px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          box-shadow: 0 8px 32px rgba(124,58,237,0.5);
          transition: opacity 0.2s, transform 0.2s;
        }

        .btn-get-started:hover { opacity: 0.88; transform: translateY(-1px); }

        .btn-explore {
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.28);
          color: white;
          padding: 15px 36px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          transition: background 0.2s, transform 0.2s;
        }

        .btn-explore:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-1px);
        }

        /* Social proof */
        .social-proof {
          display: flex;
          align-items: center;
          gap: 12px;
          animation: fadeUp 0.5s ease 0.4s both;
        }

        .avatar-stack { display: flex; align-items: center; }

        .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 2px solid #150d2a;
          background: #2d1b69;
          object-fit: cover;
        }

        .social-text {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          font-family: 'DM Sans', sans-serif;
        }

        .social-count {
          color: #a78bfa;
          font-weight: 700;
        }
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.15);
  border-top: 2px solid #a855f7;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* inner cutout for ring effect */
.spinner::before {
  content: "";
  position: absolute;
  inset: 3px;
  background: #0d0d14; /* same as your background */
  border-radius: 50%;
}
.spinner-light {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.2);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
      `}</style>

      <div className="landing-root">
        <div className="grid-bg" />
        <div className="glow-left" />
        <div className="glow-right" />

        {/* Navbar */}
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
          <div className="nav-inner">
            <span className="logo">ZapiQ</span>
            <div className="nav-links">
              {/* {navLinks.map((link) => (
                <a key={link} href="#" className="nav-link">{link}</a>
              ))} */}
            </div>
            <div className="nav-buttons">
              <button
                className="btn-signin"
                onClick={() => goTo("/signup")}
                disabled={loadingPath === "/signup"}
              >
                {loadingPath === "/signup" ? (
                  <span className="spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </button>

              <button
                className="btn-register"
                onClick={() => goTo("/login")}
                disabled={loadingPath === "/login"}
              >
                {loadingPath === "/login" ? (
                  <span className="spinner-light"></span>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <main className="hero">
          <div className="badge">
            <span className="badge-icon">✦</span>
            <span className="badge-text">The ultimate quiz experience</span>
          </div>

          <h1 className="heading">
            Learn, Quiz, <span className="heading-accent">Compete</span>
          </h1>

          <p className="subtext">
            Join thousands of students and teachers on the ultimate quiz
            platform. Test your knowledge, compete with peers, and win exciting
            rewards.
          </p>

          <div className="cta-row">
            <button
              className="btn-get-started"
              onClick={() => goTo("/signup")}
              disabled={loadingPath === "/signup"}
            >
              {loadingPath === "/signup" ? (
                <span className="spinner-light"></span>
              ) : (
                "Get Started"
              )}
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
