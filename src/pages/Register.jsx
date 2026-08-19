
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import { validateName, validateEmail, validatePassword } from "../utils/validators";

const initialState = { name: "", email: "", password: "" };

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate a single field on change so messages appear live (reactive form).
  const validateField = (name, value) => {
    if (name === "name") return validateName(value);
    if (name === "email") return validateEmail(value);
    return validatePassword(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Form is valid only when all fields pass validation (enables the button).
  const isValid =
    !validateName(form.name) &&
    !validateEmail(form.email) &&
    !validatePassword(form.password);

  const handleReset = () => {
    setForm(initialState);
    setErrors({});
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/login"); // redirect to login after successful registration
    } catch (err) {
      setServerError(err.message); // e.g. "Email already registered"
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} noValidate>
        <InputField label="Name" name="name" value={form.name}
          onChange={handleChange} error={errors.name} />
        <InputField label="Email" name="email" type="email" value={form.email}
          onChange={handleChange} error={errors.email} />
        <InputField label="Password" name="password" type="password"
          value={form.password} onChange={handleChange} error={errors.password} />

        {serverError && <p className="error-text">{serverError}</p>}

        <div className="form-actions">
          <Button type="submit" disabled={!isValid} loading={loading}>
            Register
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
