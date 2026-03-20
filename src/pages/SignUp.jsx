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
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  function parseBackendErrors(error) {
    if (!error || typeof error !== "object") {
      return {
        globalError: "Something went wrong. Please try again.",
        nextFieldErrors: {},
      };
    }

    const nextFieldErrors = {};

    if (Array.isArray(error.first_name) && error.first_name.length > 0) {
      nextFieldErrors.firstName = error.first_name[0];
    }
    if (Array.isArray(error.last_name) && error.last_name.length > 0) {
      nextFieldErrors.lastName = error.last_name[0];
    }
    if (Array.isArray(error.email) && error.email.length > 0) {
      nextFieldErrors.email = error.email[0];
    }
    if (Array.isArray(error.password) && error.password.length > 0) {
      nextFieldErrors.password = error.password[0];
    }
    if (Array.isArray(error.confirm_password) && error.confirm_password.length > 0) {
      nextFieldErrors.confirmPassword = error.confirm_password[0];
    }
    if (Array.isArray(error.team_id) && error.team_id.length > 0) {
      nextFieldErrors.team = error.team_id[0];
    }

    let globalError = "";
    if (Array.isArray(error.non_field_errors) && error.non_field_errors.length > 0) {
      globalError = error.non_field_errors[0];
    } else if (Object.keys(nextFieldErrors).length === 0) {
      globalError = "Unable to sign up. Please check your details and try again.";
    }

    return { globalError, nextFieldErrors };
  }

  function clearFieldError(fieldName) {
    setFieldErrors((previousErrors) => {
      if (!previousErrors[fieldName]) return previousErrors;
      const updatedErrors = { ...previousErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setFieldErrors({});

    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    setIsSubmitting(true);

    const teamId = selectedTeamId ? Number(selectedTeamId) : null;

    const signupPayload = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      confirm_password: confirmPassword,
    };

    if (teamId) {
      signupPayload.team_id = teamId;
    }

    try {
      await signup(signupPayload);
      await login(teamId ? { email, password, team_id: teamId } : { email, password });
      navigate("/");
    } catch (error) {
      const { globalError, nextFieldErrors } = parseBackendErrors(error);
      setErrorMessage(globalError);
      setFieldErrors(nextFieldErrors);
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
            <p className="form-help-text">
              You can only belong to one team.
            </p>
            {fieldErrors.team ? (
              <p className="field-error-message">{fieldErrors.team}</p>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              placeholder="jane@company.com"
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
