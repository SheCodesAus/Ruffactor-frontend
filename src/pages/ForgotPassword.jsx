import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../api/auth.js";
import "./Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await requestPasswordReset({ email });
      setSuccessMessage(
        response?.message ||
          "If an account exists for that email, you will receive a password reset email shortly.",
      );
      setEmail("");
    } catch (error) {
      const firstField = error && typeof error === "object" ? Object.keys(error)[0] : null;
      const firstFieldMessage =
        firstField && Array.isArray(error[firstField]) ? error[firstField][0] : "";
      setErrorMessage(firstFieldMessage || "Unable to process request right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-heading">Forgot Password</h2>
        <p className="login-page-subtitle">
          Enter your email and we&apos;ll send you a password reset link.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {errorMessage ? <p className="auth-error-message">{errorMessage}</p> : null}
          {successMessage ? (
            <p className="auth-success-message">{successMessage}</p>
          ) : null}

          <div className="form-group">
            <label htmlFor="forgot-email">Email</label>
            <input
              id="forgot-email"
              type="email"
              placeholder="jane+pp@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <p className="auth-switch">
          Back to <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
