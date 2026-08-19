
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import { validateEmail, validateRequired } from "../utils/validators";

const initialState = { email: "", password: "" };

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const error =
      name === "email" ? validateEmail(value) : validateRequired(value, "Password");
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Button enabled only when both fields are valid.
  const isValid = !validateEmail(form.email) && !!form.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/products"); // land on product listing after login
    } catch (err) {
      setServerError(err.message); // e.g. "Invalid credentials"
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <InputField label="Email" name="email" type="email" value={form.email}
          onChange={handleChange} error={errors.email} />
        <InputField label="Password" name="password" type="password"
          value={form.password} onChange={handleChange} error={errors.password} />

        {serverError && <p className="error-text">{serverError}</p>}

        <Button type="submit" disabled={!isValid} loading={loading}>
          Login
        </Button>
      </form>
      <p>New here? <Link to="/register">Create an account</Link></p>
    </div>
  );
};

export default Login;
