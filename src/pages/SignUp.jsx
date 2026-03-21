import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const API_BASE = "https://ruffactor-backend-f36fc347ab07.herokuapp.com";
function SignUp() {
  const teamOptions = [
    { id: 1, name: "Account Management" },
    { id: 2, name: "Sales" },
    { id: 3, name: "Tech" },
    { id: 4, name: "Management" },
    { id: 5, name: "Administration" },
  ];

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const firstError =
          typeof data === "object"
            ? Object.values(data).flat().join(" ")
            : "Sign up failed.";
        throw new Error(firstError);
      }

      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-heading">Sign Up</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {errorMessage ? <p className="auth-error-message">{errorMessage}</p> : null}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="signup-first">First Name</label>
              <input
                id="signup-first"
                type="text"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  clearFieldError("firstName");
                }}
                className={fieldErrors.firstName ? "field-error-input" : ""}
                required
              />
              {fieldErrors.firstName ? (
                <p className="field-error-message">{fieldErrors.firstName}</p>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="signup-last">Last Name</label>
              <input
                id="signup-last"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  clearFieldError("lastName");
                }}
                className={fieldErrors.lastName ? "field-error-input" : ""}
                required
              />
              {fieldErrors.lastName ? (
                <p className="field-error-message">{fieldErrors.lastName}</p>
              ) : null}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              placeholder="jane+pp@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              className={fieldErrors.email ? "field-error-input" : ""}
              required
            />
            {fieldErrors.email ? (
              <p className="field-error-message">{fieldErrors.email}</p>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError("password");
              }}
              className={fieldErrors.password ? "field-error-input" : ""}
              required
            />
            {fieldErrors.password ? (
              <p className="field-error-message">{fieldErrors.password}</p>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="signup-confirm">Confirm Password</label>
            <input
              id="signup-confirm"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearFieldError("confirmPassword");
              }}
              className={fieldErrors.confirmPassword ? "field-error-input" : ""}
              required
            />
            {fieldErrors.confirmPassword ? (
              <p className="field-error-message">{fieldErrors.confirmPassword}</p>
            ) : null}
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;