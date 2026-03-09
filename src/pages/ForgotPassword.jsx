import { Link } from "react-router-dom";
import "./Login.css";

function ForgotPassword() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Forgot password?</h2>
        <p style={{ marginTop: "0.5rem", color: "#666" }}>
          Password reset is not implemented yet. Contact your admin or try logging in again.
        </p>
        <Link to="/login" className="forgot-link" style={{ display: "inline-block", marginTop: "1rem" }}>
          Back to Log In
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
