import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function getErrorText(error) {
    if (!error || typeof error !== "object") {
      return "Something went wrong. Please try again.";
    }

    if (Array.isArray(error.non_field_errors) && error.non_field_errors.length > 0) {
      return error.non_field_errors[0];
    }

    const firstField = Object.keys(error)[0];
    if (firstField && Array.isArray(error[firstField]) && error[firstField].length > 0) {
      return error[firstField][0];
    }

    return "Unable to log in. Please check your details and try again.";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      setErrorMessage(getErrorText(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="login-page-header">
          <img
            src="img/pp-logo-v.png"
            alt="Pixel Pulse logo"
            className="login-page-logo"
          />
          <h1 className="login-page-title">Pixel Pulse</h1>
          <p className="login-page-subtitle">
            Celebrate great work with your team. Log in to continue.
          </p>
        </div>
        <h2 className="auth-heading">Log In</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {errorMessage ? <p className="auth-error-message">{errorMessage}</p> : null}
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="form-options">
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>
          </div>
          <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </form>
        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
