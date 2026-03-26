import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { confirmPasswordReset } from "../api/auth.js";
import "./Login.css";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const uid = searchParams.get("uid") || "";
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasValidResetParams = Boolean(uid && token);

  function getFieldError(fieldName) {
    const fieldValue = fieldErrors?.[fieldName];
    return Array.isArray(fieldValue) && fieldValue.length > 0
      ? fieldValue[0]
      : "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!hasValidResetParams) return;

    setFieldErrors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await confirmPasswordReset({
        uid,
        token,
        password,
        confirm_password: confirmPassword,
      });

      setSuccessMessage(
        response?.message || "Password has been reset successfully.",
      );

      // Give users a brief success state before routing to login.
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      if (error && typeof error === "object") {
        setFieldErrors(error);
      } else {
        setFieldErrors({
          token: ["Invalid or expired reset link."],
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-heading">Reset Password</h2>
        {!hasValidResetParams ? (
          <>
            <p className="auth-error-message">Invalid or expired reset link.</p>
            <p className="auth-switch">
              Back to <Link to="/login">Log In</Link>
            </p>
          </>
        ) : (
          <>
            <p className="login-page-subtitle">
              Enter your new password below.
            </p>
            <form className="auth-form" onSubmit={handleSubmit}>
              {getFieldError("uid") ? (
                <p className="auth-error-message">{getFieldError("uid")}</p>
              ) : null}
              {getFieldError("token") ? (
                <p className="auth-error-message">{getFieldError("token")}</p>
              ) : null}
              {successMessage ? (
                <p className="auth-success-message">{successMessage}</p>
              ) : null}
              <div className="form-group">
                <label htmlFor="reset-password">New Password</label>
                <input
                  id="reset-password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {getFieldError("password") ? (
                  <p className="auth-error-message">{getFieldError("password")}</p>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="reset-confirm-password">Confirm Password</label>
                <input
                  id="reset-confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {getFieldError("confirm_password") ? (
                  <p className="auth-error-message">
                    {getFieldError("confirm_password")}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </form>
            <p className="auth-switch">
              Back to <Link to="/login">Log In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
