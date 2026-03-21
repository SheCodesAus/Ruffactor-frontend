import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./SignUp.css";

function SignUp() {
  const teamOptions = [
    { id: 1, name: "Account Management" },
    { id: 2, name: "Sales" },
    { id: 3, name: "Tech" },
    { id: 4, name: "Management" },
    { id: 5, name: "Administration" },
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup, login } = useAuth();
  const navigate = useNavigate();

  function parseBackendErrors(error) {
    const parsedFieldErrors = {};
    let message = "Unable to create account. Please check your details and try again.";

    if (!error || typeof error !== "object") {
      return { message, parsedFieldErrors };
    }

    const fieldMap = {
      first_name: "firstName",
      last_name: "lastName",
      email: "email",
      password: "password",
      confirm_password: "confirmPassword",
      team_id: "team",
    };

    Object.entries(error).forEach(([backendField, value]) => {
      const text = Array.isArray(value) ? value[0] : String(value);
      if (backendField === "non_field_errors") {
        message = text;
        return;
      }
      const uiField = fieldMap[backendField];
      if (uiField) parsedFieldErrors[uiField] = text;
    });

    if (Object.keys(parsedFieldErrors).length > 0) {
      message = "Please fix the highlighted fields.";
    }

    return { message, parsedFieldErrors };
  }

  function clearFieldError(fieldName) {
    setFieldErrors((prev) => {
      if (!prev[fieldName]) return prev;
      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const payload = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password,
        confirm_password: confirmPassword,
      };

      if (selectedTeamId) payload.team_id = Number(selectedTeamId);

      await signup(payload);
      await login({ email: payload.email, password });
      navigate("/");
    } catch (error) {
      const parsed = parseBackendErrors(error);
      setErrorMessage(parsed.message);
      setFieldErrors(parsed.parsedFieldErrors);
    } finally {
      setIsSubmitting(false);
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
            {fieldErrors.email ? <p className="field-error-message">{fieldErrors.email}</p> : null}
          </div>

          <div className="form-group">
            <label htmlFor="signup-team">Team</label>
            <select
              id="signup-team"
              value={selectedTeamId}
              onChange={(e) => {
                setSelectedTeamId(e.target.value);
                clearFieldError("team");
              }}
              className={fieldErrors.team ? "field-error-input" : ""}
            >
              <option value="">Select your team (optional)</option>
              {teamOptions.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            <p className="form-help-text">You can only belong to one team.</p>
            {fieldErrors.team ? <p className="field-error-message">{fieldErrors.team}</p> : null}
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

          <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
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