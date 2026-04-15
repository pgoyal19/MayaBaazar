import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AuthGateModal({ showToast }) {
  const { authGateOpen, closeAuthGate, authGatePath, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && authGateOpen) closeAuthGate();
  }, [isAuthenticated, authGateOpen, closeAuthGate]);

  const [step, setStep] = useState("login"); // login, otp, profile
  const [isSignUp, setIsSignUp] = useState(false);
  const [method, setMethod] = useState("email");
  const [input, setInput] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [profile, setProfile] = useState({ name: "", address: "" });

  if (!authGateOpen) return null;

  const sendOtp = () => {
    if (!input) {
      if (showToast) showToast("Enter email or phone number");
      else alert("Enter email or phone");
      return;
    }
    const fakeOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(fakeOtp);
    alert(`Mock OTP: ${fakeOtp}`);
    setStep("otp");
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setStep("profile");
      if (showToast) showToast("OTP Verified! Provide your details.");
    } else {
      if (showToast) showToast("Invalid OTP entered.");
      else alert("Invalid OTP");
    }
  };

  const saveProfile = async () => {
    const result = await register(profile.name || "Demo User", input, 'otp-verified', 'buyer');
    if (result.ok) {
      if (showToast) showToast("Profile Saved Successfully ✨");
      closeAuthGate();
      const target = authGatePath || '/';
      navigate(target, { replace: false });
    } else {
      if (showToast) showToast("Failed to save profile.");
    }
  };

  return (
    <div className="auth-gate-overlay" data-no-auth-gate role="dialog" aria-modal="true" aria-labelledby="auth-gate-title">
      <div className="auth-gate-modal">
        <button type="button" className="auth-gate-close" onClick={closeAuthGate} aria-label="Close">
          ✕
        </button>
        <h2 id="auth-gate-title" className="auth-gate-title">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>
        <p className="auth-gate-hint">{isSignUp ? 'Join our community' : 'Secure OTP Profile Verification'}</p>

        {step === "login" && (
          <form onSubmit={e => { e.preventDefault(); sendOtp(); }} style={{ marginTop: '1rem' }}>
            <div className="auth-tabs" role="tablist" style={{ marginBottom: '1.5rem' }}>
              <button
                type="button"
                role="tab"
                onClick={() => setMethod("email")}
                className={`auth-tab ${method === "email" ? 'active' : ''}`}
                style={{ flex: 1 }}
              >
                Email
              </button>
              <button
                type="button"
                role="tab"
                onClick={() => setMethod("phone")}
                className={`auth-tab ${method === "phone" ? 'active' : ''}`}
                style={{ flex: 1 }}
              >
                Phone
              </button>
            </div>

            <label className="auth-label">
              {method === "email" ? "Email Address" : "Phone Number"}
              <input
                className="auth-input"
                type="text"
                placeholder={method === "email" ? "Enter Email" : "Enter Phone"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
              />
            </label>

            <button
              type="submit"
              className="auth-submit ui-btn-red"
              style={{ marginTop: '1rem' }}
            >
              Send OTP
            </button>
            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button type="button" onClick={() => setIsSignUp(!isSignUp)} style={{ background: 'none', border: 'none', color: 'var(--primary-red)', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>
                {isSignUp ? "Login" : "Sign up"}
              </button>
            </div>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={e => { e.preventDefault(); verifyOtp(); }} style={{ marginTop: '1rem' }}>
            <label className="auth-label" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              Enter the OTP sent to {input}
            </label>
            <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>
              Mock Mode: Use OTP {generatedOtp}
            </div>

            <label className="auth-label">
              <input
                className="auth-input"
                type="text"
                placeholder="6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                autoFocus
              />
            </label>

            <button
              type="submit"
              className="auth-submit ui-btn-red"
              style={{ marginTop: '1rem', backgroundColor: '#2e7d32', borderColor: '#2e7d32' }}
            >
              Verify OTP
            </button>
            <button
              type="button"
              onClick={() => setStep('login')}
              className="ui-btn-white shift-hover"
              style={{ width: '100%', marginTop: '0.8rem', padding: '0.8rem 1rem', fontSize: '1rem', justifyContent: 'center' }}
            >
              Go Back
            </button>
          </form>
        )}

        {step === "profile" && (
          <form onSubmit={e => { e.preventDefault(); saveProfile(); }} style={{ marginTop: '1rem' }}>
            <label className="auth-label">
              Full Name
              <input
                className="auth-input"
                type="text"
                placeholder="Your Full Name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                autoFocus
              />
            </label>

            <label className="auth-label">
              Delivery Address (Optional)
              <textarea
                className="auth-input"
                placeholder="Full Shipping Address"
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
                style={{ resize: 'vertical', minHeight: '80px', fontFamily: 'inherit' }}
              />
            </label>

            <button
              type="submit"
              className="auth-submit ui-btn-red"
              style={{ marginTop: '1rem', backgroundColor: '#8e44ad', borderColor: '#8e44ad' }}
            >
              Complete Validation
            </button>
            
            <button
              type="button"
              onClick={saveProfile}
              className="ui-btn-white shift-hover"
              style={{ width: '100%', marginTop: '0.8rem', padding: '0.8rem 1rem', fontSize: '1rem', justifyContent: 'center' }}
            >
              Skip Details
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
