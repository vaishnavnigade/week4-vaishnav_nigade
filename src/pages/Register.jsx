import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initial = { name: "", email: "", password: "", mobile: "" };

function validate(values) {
  const e = {};
  if (!values.name.trim()) e.name = "Name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    e.email = "Enter a valid email address.";
  if (values.password.length < 6)
    e.password = "Password must be at least 6 characters.";
  if (!/^\d{10}$/.test(values.mobile))
    e.mobile = "Enter a valid 10-digit mobile number.";
  return e;
}

const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "Your full name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { name: "password", label: "Password", type: "password", placeholder: "At least 6 characters" },
  { name: "mobile", label: "Mobile", type: "tel", placeholder: "10-digit number" },
];

export default function Register() {
  const { register } = useAuth();          // ← restored
  const navigate = useNavigate();          // ← restored
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
      await register(values);   // ← THE ACTUAL REGISTRATION CALL
      navigate("/login");       // ← redirect after success
    } catch (err) {
      setServerError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setValues(initial);
    setErrors({});
    setServerError("");
  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Create Account</h1>
        <p className="subtitle">Join ABC Shop to start shopping</p>

        {fields.map((f) => (
          <div className="field" key={f.name}>
            <label htmlFor={f.name}>{f.label}</label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              placeholder={f.placeholder}
              value={values[f.name]}
              onChange={handleChange}
              className={errors[f.name] ? "invalid" : ""}
            />
            {errors[f.name] && <div className="error">{errors[f.name]}</div>}
          </div>
        ))}

        {serverError && <div className="error" style={{ marginBottom: 12 }}>{serverError}</div>}

        <div className="btn-row">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={loading}>
            Reset
          </button>
        </div>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
