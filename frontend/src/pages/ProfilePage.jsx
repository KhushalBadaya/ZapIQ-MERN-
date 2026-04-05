import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { authUser, setAuthUser } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    username: authUser?.username || "",
    currentPassword: "",
    newPassword: "",
    profilePic: authUser?.profilePic || null,
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [imagePreview, setImagePreview] = useState(authUser?.profilePic || null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setImagePreview(base64Image);
      setFormData({ ...formData, profilePic: base64Image });
    };
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Prepare payload (exclude empty passions to avoid triggering change password logic)
    const payload = {
        fullName: formData.fullName,
        username: formData.username,
        profilePic: formData.profilePic !== authUser?.profilePic ? formData.profilePic : undefined,
    };

    if (formData.currentPassword || formData.newPassword) {
        if (!formData.currentPassword || !formData.newPassword) {
            toast.error("Both current and new password are required to change password.");
            setIsUpdating(false);
            return;
        }
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
    }

    try {
      const res = await axiosInstance.put("/auth/update-profile", payload);
      setAuthUser(res.data);
      toast.success("Profile updated successfully");
      
      // Clear password fields
      setFormData({
          ...formData,
          currentPassword: "",
          newPassword: ""
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .profile-root {
          min-height: 100vh;
          background: #0f0f13;
          font-family: 'Sora', sans-serif;
          color: white;
          display: flex;
          flex-direction: column;
        }

        .topbar {
          display: flex;
          align-items: center;
          padding: 16px 32px;
          background: #18181f;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky;
          top: 0;
          z-index: 50;
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
          margin-right: 16px;
        }

        .back-btn:hover { background: #2d2d3a; }

        .topbar-title {
          font-size: 18px;
          font-weight: 700;
        }

        /* ── Main Layout ── */
        .main-layout {
          width: 100%;
          max-width: 700px;
          margin: 40px auto;
          background: #18181f;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 40px;
        }

        .header-section {
          text-align: center;
          margin-bottom: 32px;
        }

        .pic-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 16px;
          border-radius: 50%;
          border: 3px solid #23232e;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #23232e;
          cursor: pointer;
          overflow: hidden;
        }

        .pic-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pic-container .initial {
          font-size: 40px;
          font-weight: 700;
          color: #a78bfa;
        }

        .upload-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-family: 'DM Sans', sans-serif;
          opacity: 0;
          transition: opacity 0.2s;
          color: white;
        }

        .pic-container:hover .upload-overlay {
          opacity: 1;
        }

        .user-email {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          font-family: 'DM Sans', sans-serif;
          margin-top: 4px;
        }

        /* ── Form Items ── */
        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          margin-bottom: 8px;
          font-family: 'DM Sans', sans-serif;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          background: #23232e;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: white;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-input:focus { border-color: #a78bfa; }
        .form-input::placeholder { color: rgba(255,255,255,0.2); }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 32px 0;
        }
        
        .section-title {
          font-size: 15px;
          font-weight: 600;
          color: white;
          margin-bottom: 16px;
        }

        .btn-save {
          width: 100%;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          color: white;
          padding: 14px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          box-shadow: 0 4px 20px rgba(124,58,237,0.35);
          transition: opacity 0.2s;
          margin-top: 24px;
        }

        .btn-save:hover { opacity: 0.88; }
        .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

      `}</style>
      <div className="profile-root">
        <div className="topbar">
          <button className="back-btn" onClick={() => navigate(-1)}>‹</button>
          <div className="topbar-title">My Profile</div>
        </div>

        <div className="main-layout">
          <form onSubmit={handleSave}>
            <div className="header-section">
              <label className="pic-container">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" />
                ) : (
                  <div className="initial">{authUser?.fullName?.charAt(0).toUpperCase() || "U"}</div>
                )}
                <div className="upload-overlay">Change Image</div>
                <input 
                  type="file" 
                  accept="image/*" 
                  style={{ display: "none" }} 
                  onChange={handleImageUpload} 
                />
              </label>
              <h2 style={{ fontSize: 20 }}>{authUser?.fullName}</h2>
              <p className="user-email">{authUser?.email}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            <div className="divider" />
            <h3 className="section-title">Change Password</h3>

            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your current password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter the new password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-save" disabled={isUpdating}>
              {isUpdating ? "Saving Changes..." : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
