import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initial = { email: "", password: "" };

function validate(values) {
  const e = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    e.email = "Enter a valid email address.";
  if (!values.password) e.password = "Password is required.";
  return e;
}

export default function Login() {
  const { login } = useAuth();            // ← restored
  const navigate = useNavigate();         // ← restored
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(ev) {
    const next = { ...values, [ev.target.name]: ev.target.value };
    setValues(next);
    setErrors(validate(next));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;   // stop if invalid

    setServerError("");
    setLoading(true);
    try {
      await login(values);          // ← THE ACTUAL LOGIN CALL
      navigate("/products");        // ← redirect after success
    } catch (err) {
      setServerError(err?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to your ABC Shop account</p>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            className={errors.email ? "invalid" : ""}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            value={values.password}
            onChange={handleChange}
            className={errors.password ? "invalid" : ""}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        {serverError && <div className="error" style={{ marginBottom: 12 }}>{serverError}</div>}

        <div className="btn-row">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="auth-footer">
          New here? <Link to="/register">Create an account</Link>
        </div>
      </form>
    </div>
  );
}
